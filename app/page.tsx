import { Hero } from '@/components/chiefdom/Hero';
import { ChiefMessage } from '@/components/chiefdom/ChiefMessage';
import { StatsGrid } from '@/components/chiefdom/StatsGrid';

const heroConfig = {
  title: 'CHEFFERIE DES ANGHAL',
  subtitle: 'Territoire de Mahagi • Province de l’Ituri • République Démocratique du Congo',
  motto: 'Heritage • Unity • Development'
};

const chiefMessage = {
  portrait: '/images/chief-portrait-placeholder.jpg',
  fullName: 'Chef actuel — Porteur de la continuité',
  customaryTitle: 'Mwami de la Chefferie des Anghal',
  message:
    "Ce site est la maison numérique de notre peuple, un lieu où le passé est respecté et où les prochains chapitres sont écrits ensemble."
};

const statistics = [
  { label: 'Population', value: 'Présentation à venir', unit: 'personnes', year: '2025', source: 'Données en cours de vérification', note: 'Données à fournir par la chefferie' },
  { label: 'Groupements', value: '2', unit: 'groupements', year: '2025', source: 'Source interne', note: 'Anghal 1 et Anghal 2' },
  { label: 'Villages', value: '5 (DEMO)', unit: 'villages', year: '2025', source: 'Données démonstratives' },
  { label: 'Écoles', value: '3 (DEMO)', unit: 'établissements', year: '2025', source: 'Catalogue de projet' }
];

export default function HomePage() {
  return (
    <main>
      <Hero title={heroConfig.title} subtitle={heroConfig.subtitle} motto={heroConfig.motto} />
      <ChiefMessage {...chiefMessage} />
      <StatsGrid items={statistics} />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-10 shadow-soft">
            <h2 className="text-3xl font-serif font-semibold text-neutral-950">Un foyer numérique enraciné dans l’histoire et la gouvernance</h2>
            <p className="mt-6 text-neutral-700 leading-8">
              Cette plateforme est conçue pour présenter la dignité de la Chefferie des Anghal, raconter l’histoire de nos anciens,
              illustrer l’organisation des communautés et soutenir les projets qui bâtissent l’avenir.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
