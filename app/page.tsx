const links = [
  ["Wiki", "/wiki/", "Join steps, claims, commands, and the economy guide."],
  ["Live data", "/data/", "Market, economy, time, leaderboards, and player stats."],
  ["Plugins", "/plugins/", "The official suite with auto-updates."],
  ["Developers", "/developer/", "Product keys, server presence, and suite entitlements."],
];

export default function Home() {
  return (
    <main>
      <header className="header">
        <a className="brand" href="/">◈ RootMC <span>NETWORK</span></a>
        <nav><a href="/wiki/">Wiki</a><a href="/data/">Data</a><a href="/history/">History</a><a href="/login/">Login</a></nav>
      </header>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><i /> Primary server · live</p>
          <p className="kicker">THE ROOTMC NETWORK</p>
          <h1>Your journey is written in <strong>The Root.</strong></h1>
          <p className="lead">One primary survival world with closed-loop Gold, a live market, and progression that stays with you.</p>
          <div className="actions"><a className="button primary" href="https://play.rootmc.net">Join · play.rootmc.net</a><a className="button" href="/wiki/">Read the wiki</a><a className="button" href="https://discord.gg/rFFQYrNaqS">Discord</a></div>
        </div>
        <div className="hero-card"><span>OFFICIAL · PRIMARY</span><b>Survival, with a memory.</b><p>Claims, towns, mcMMO, votes, ranks, and a player economy built for long-form play.</p><code>play.rootmc.net</code></div>
      </section>
      <section className="section"><p className="eyebrow">OFFICIAL ROOTMC</p><h2>Play the world. Keep the story.</h2><p className="section-lead">RootMC is survival Minecraft centered on cooperation, trade, territory, and fair play.</p><div className="grid">{links.map(([title, text, detail]) => <a className="card" href={text} key={title}><span>EXPLORE</span><h3>{title}</h3><p>{detail}</p><b>Open {title} →</b></a>)}</div></section>
      <section className="principles"><div><p className="eyebrow">THE DIFFERENCE</p><h2>A closed-loop world.</h2></div><div className="principle-list"><p><b>Gold stays in the world.</b> Minting, shops, trade, taxes, and death recycling form one readable economy.</p><p><b>Land has meaning.</b> Claims, territory buffers, and ranks protect the places players build.</p><p><b>Fair play is the baseline.</b> No x-ray, dupes, or pay-to-win shortcuts.</p></div></section>
      <footer><span>RootMC Network · play.rootmc.net</span><span><a href="/terms/">Terms</a> · <a href="/wiki/">Wiki</a> · <a href="https://discord.gg/rFFQYrNaqS">Discord</a></span></footer>
    </main>
  );
}
