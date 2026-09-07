export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        gap: "0.75rem",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: 600 }}>RootMC</h1>
      <p style={{ margin: 0, color: "#666" }}>rootmc.net — blank template</p>
    </main>
  );
}
