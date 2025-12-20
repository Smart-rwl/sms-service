import { createClient } from "@supabase/supabase-js";

export async function getServerSideProps() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL1,
    process.env.SUPABASE_SERVICE_KEY
  );

  const { data, error } = await supabase
    .from("sms_messages")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
  }

  return {
    props: {
      messages: data || []
    }
  };
}

export default function Home() {
  return (
    <div style={{ padding: 40, fontFamily: 'Arial, sans-serif' }}>
      <h1>SMS Service Dashboard</h1>
      <p>The homepage is working correctly.</p>
      <p>Next step: connect Supabase dashboard view.</p>
    </div>
  );
}
