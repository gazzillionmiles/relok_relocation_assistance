import { COLLEGES } from '@/data/autocompleteData';

export function getPrioritizedColleges(city: string): string[] {
  const targetCity = (city || 'Bengaluru').toLowerCase();

  const matches = COLLEGES.filter((col) => {
    const name = col.toLowerCase();

    if (
      targetCity.includes('delhi') ||
      targetCity.includes('noida') ||
      targetCity.includes('gurgaon') ||
      targetCity.includes('ncr')
    ) {
      return (
        name.includes('delhi') ||
        name.includes('du') ||
        name.includes('shri ram') ||
        name.includes('st. stephen') ||
        name.includes('dtu') ||
        name.includes('nsut')
      );
    }

    if (targetCity.includes('bengaluru') || targetCity.includes('bangalore')) {
      return (
        name.includes('bangalore') ||
        name.includes('bengaluru') ||
        name.includes('rvce') ||
        name.includes('pes') ||
        name.includes('ramaiah') ||
        name.includes('bms') ||
        name.includes('christ') ||
        name.includes('iisc')
      );
    }

    if (
      targetCity.includes('mumbai') ||
      targetCity.includes('navi mumbai') ||
      targetCity.includes('thane')
    ) {
      return (
        name.includes('mumbai') ||
        name.includes('vjti') ||
        name.includes('st. xavier')
      );
    }

    if (targetCity.includes('pune')) {
      return (
        name.includes('pune') ||
        name.includes('coep') ||
        name.includes('symbiosis')
      );
    }

    if (targetCity.includes('hyderabad')) {
      return (
        name.includes('hyderabad') ||
        name.includes('iiit hyderabad') ||
        name.includes('bits')
      );
    }

    if (targetCity.includes('chennai')) {
      return (
        name.includes('chennai') ||
        name.includes('madras') ||
        name.includes('loyola')
      );
    }

    return name.includes(targetCity);
  });

  const nonMatches = COLLEGES.filter((col) => !matches.includes(col));
  return [...matches, ...nonMatches];
}
