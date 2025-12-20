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

export default function Home({ messages }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>SMS Dashboard</h1>
      <hr />

      {messages.length === 0 && (
        <p>No messages received yet.</p>
      )}

      {messages.length > 0 && (
        <table border="1" width="100%" cellPadding="10">
          <thead>
            <tr>
              <th>Sender</th>
              <th>Message</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.id}>
                <td>{m.sender}</td>
                <td>{m.message}</td>
                <td>{m.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
