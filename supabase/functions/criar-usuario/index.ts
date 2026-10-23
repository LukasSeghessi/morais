import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


Deno.serve(async (req) => {
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

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
    );

    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password: senha,
        email_confirm: true,
      });

    if (authError) {
      return new Response(
        JSON.stringify({ error: authError.message }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data: linhaExistente } = await supabaseAdmin
      .from("usuarios")
      .select("id")
      .eq("auth_user_id", authData.user.id)
      .maybeSingle();

    let usuarioData;
    let usuarioError;

    if (linhaExistente) {
      const resultado = await supabaseAdmin
        .from("usuarios")
        .update({ nome, email, telefone, tipo })
        .eq("id", linhaExistente.id)
        .select()
        .single();

      usuarioData = resultado.data;
      usuarioError = resultado.error;
    } else {
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