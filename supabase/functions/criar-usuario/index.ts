import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Essa function roda no SERVIDOR do Supabase, nunca no navegador.
// Por isso ela pode usar a SERVICE_ROLE_KEY com seguranca -- essa chave
// tem poderes de admin e NUNCA deve aparecer em codigo que roda no navegador.

Deno.serve(async (req) => {
  // Trata a requisicao "preflight" que o navegador manda antes do POST de verdade.
  // Sem isso, o navegador bloqueia a chamada com erro de CORS.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, senha, nome, telefone, tipo } = await req.json();

    if (!email || !senha || !nome) {
      return new Response(
        JSON.stringify({ error: "Preencha nome, email e senha." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Client com privilegio de admin (service_role), so existe aqui no servidor.
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
    );

    // 1. Cria o login de verdade no Supabase Auth.
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password: senha,
        email_confirm: true, // pula a etapa de confirmar e-mail
      });

    if (authError) {
      return new Response(
        JSON.stringify({ error: authError.message }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Verifica se ja existe uma linha pra esse auth_user_id (por exemplo,
    // criada automaticamente por algum trigger do banco). Se existir, atualiza
    // ela com os dados reais em vez de criar uma segunda linha duplicada.
    const { data: linhaExistente } = await supabaseAdmin
      .from("usuarios")
      .select("id")
      .eq("auth_user_id", authData.user.id)
      .maybeSingle();

    let usuarioData;
    let usuarioError;

    if (linhaExistente) {
      // Ja existe (provavelmente criada por um trigger) -- so atualiza.
      const resultado = await supabaseAdmin
        .from("usuarios")
        .update({ nome, email, telefone, tipo })
        .eq("id", linhaExistente.id)
        .select()
        .single();

      usuarioData = resultado.data;
      usuarioError = resultado.error;
    } else {
      // Nao existe ainda -- cria a linha do zero.
      const resultado = await supabaseAdmin
        .from("usuarios")
        .insert([
          {
            nome,
            email,
            telefone,
            tipo,
            auth_user_id: authData.user.id,
          },
        ])
        .select()
        .single();

      usuarioData = resultado.data;
      usuarioError = resultado.error;
    }

    if (usuarioError) {
      return new Response(
        JSON.stringify({ error: usuarioError.message }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ usuario: usuarioData }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};