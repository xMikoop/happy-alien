export interface Rank {
  level: number;
  name: string;
  description: string;
  threshold: number;
}

export const RANKS: Rank[] = [
  { level: 1, name: "Zdezorientowany Pyłek Gwiezdny", threshold: 0, description: "Twoim największym osiągnięciem jest nieprzypadkowe mrugnięcie obydwoma oczami jednocześnie." },
  { level: 2, name: "Aspirujący Pożeracz Herbaty", threshold: 100, description: "Potrafisz już odróżnić kwazar od filiżanki Earl Grey." },
  { level: 3, name: "Rycerz, który mówi 'Ni!'", threshold: 300, description: "Teraz potrafisz sterroryzować staruszkę za pomocą kawałka krzewu." },
  { level: 4, name: "Minister Głupich Kroków Kosmicznych", threshold: 600, description: "Twoje poruszanie się w czasoprzestrzeni jest tak nielogiczne, że aż genialne." },
  { level: 5, name: "Wielki Przedwieczny Monty", threshold: 1000, description: "Osiągnąłeś stan oświecenia, w którym rzeczywistość jest tylko animacją wycinankową." },
];

export function getRankByPoints(points: number): Rank {
  return [...RANKS].reverse().find(r => points >= r.threshold) || RANKS[0];
}
