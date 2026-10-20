import type { ItensTableProps } from "../../components/table";


type Contact = {
  id: number;
  name: string | null;
  phone: string;
  firstContactAt: string;
};


const baseContacts: Contact[] = [

  { id: 1, name: "Joana Prado", phone: "+5511998812345", firstContactAt: "2026-06-01T09:00:00" },

  { id: 2, name: null, phone: "+5521987654321", firstContactAt: "2026-07-14T15:22:00" },

  { id: 3, name: "Pedro Antunes", phone: "+5531991234567", firstContactAt: "2026-07-28T06:45:00" },

  { id: 4, name: "Luciana Alves", phone: "+5541995556677", firstContactAt: "2026-08-02T12:10:00" },

  { id: 5, name: "Bruno Teixeira", phone: "+5551994443322", firstContactAt: "2026-08-05T17:05:00" },

  { id: 6, name: "Renata Lima", phone: "+5531991112233", firstContactAt: "2026-08-06T21:40:00" },

  { id: 7, name: "Marcos Vinícius", phone: "+5511987651023", firstContactAt: "2026-08-08T08:15:00" },

  { id: 8, name: "Camila Rodrigues", phone: "+5521976541032", firstContactAt: "2026-08-09T10:30:00" },

  { id: 9, name: "Felipe Martins", phone: "+5531987652043", firstContactAt: "2026-08-10T14:20:00" },

  { id: 10, name: null, phone: "+5541976543054", firstContactAt: "2026-08-11T16:45:00" },

  { id: 11, name: "Amanda Costa", phone: "+5551987654065", firstContactAt: "2026-08-12T09:12:00" },

  { id: 12, name: "Rafael Moreira", phone: "+5511976545076", firstContactAt: "2026-08-13T11:25:00" },

  { id: 13, name: "Isabela Ferreira", phone: "+5521965436087", firstContactAt: "2026-08-14T13:40:00" },

  { id: 14, name: "Gabriel Santos", phone: "+5531976547098", firstContactAt: "2026-08-15T18:05:00" },

  { id: 15, name: "Patrícia Gomes", phone: "+5541965438019", firstContactAt: "2026-08-16T20:15:00" },

  { id: 16, name: "Eduardo Ribeiro", phone: "+5551976549021", firstContactAt: "2026-08-17T07:50:00" },

  { id: 17, name: null, phone: "+5511965431032", firstContactAt: "2026-08-18T08:35:00" },

  { id: 18, name: "Beatriz Carvalho", phone: "+5521954322043", firstContactAt: "2026-08-19T12:55:00" },

  { id: 19, name: "Thiago Nascimento", phone: "+5531965433054", firstContactAt: "2026-08-20T15:10:00" },

  { id: 20, name: "Mariana Lopes", phone: "+5541954324065", firstContactAt: "2026-08-21T17:30:00" },

  { id: 21, name: "André Oliveira", phone: "+5551965435076", firstContactAt: "2026-08-22T09:45:00" },

  { id: 22, name: "Juliana Mendes", phone: "+5511954326087", firstContactAt: "2026-08-23T11:20:00" },

  { id: 23, name: "Vinícius Barbosa", phone: "+5521943217098", firstContactAt: "2026-08-24T14:05:00" },

  { id: 24, name: null, phone: "+5531954328019", firstContactAt: "2026-08-25T16:25:00" },

  { id: 25, name: "Larissa Cardoso", phone: "+5541943219021", firstContactAt: "2026-08-26T19:40:00" },

  { id: 26, name: "Gustavo Araújo", phone: "+5551954321032", firstContactAt: "2026-08-27T08:10:00" },

  { id: 27, name: "Fernanda Batista", phone: "+5511943212043", firstContactAt: "2026-08-28T10:50:00" },

  { id: 28, name: "Daniel Freitas", phone: "+5521932103054", firstContactAt: "2026-08-29T13:15:00" },

  { id: 29, name: "Letícia Monteiro", phone: "+5531943214065", firstContactAt: "2026-08-30T15:35:00" },

  { id: 30, name: "Rodrigo Castro", phone: "+5541932105076", firstContactAt: "2026-08-31T18:50:00" },

  { id: 31, name: null, phone: "+5551943216087", firstContactAt: "2026-09-01T07:25:00" },

  { id: 32, name: "Natália Correia", phone: "+5511932107098", firstContactAt: "2026-09-02T09:40:00" },

  { id: 33, name: "Leonardo Pires", phone: "+5521921098019", firstContactAt: "2026-09-03T12:05:00" },

  { id: 34, name: "Carolina Duarte", phone: "+5531932109021", firstContactAt: "2026-09-04T14:30:00" },

  { id: 35, name: "Matheus Rezende", phone: "+5541921091032", firstContactAt: "2026-09-05T17:55:00" },

  { id: 36, name: "Bianca Melo", phone: "+5551932102043", firstContactAt: "2026-09-06T20:20:00" },

  { id: 37, name: "Henrique Dias", phone: "+5511921093054", firstContactAt: "2026-09-07T08:45:00" },

  { id: 38, name: null, phone: "+5521910984065", firstContactAt: "2026-09-08T11:10:00" },

  { id: 39, name: "Priscila Ramos", phone: "+5531921095076", firstContactAt: "2026-09-09T13:35:00" },

  { id: 40, name: "Alexandre Moura", phone: "+5541910986087", firstContactAt: "2026-09-10T16:00:00" },

  { id: 41, name: "Débora Campos", phone: "+5551921097098", firstContactAt: "2026-09-11T18:25:00" },

  { id: 42, name: "Igor Fernandes", phone: "+5511910988019", firstContactAt: "2026-09-12T07:40:00" },

  { id: 43, name: "Sabrina Vieira", phone: "+5521909879021", firstContactAt: "2026-09-13T10:05:00" },

  { id: 44, name: "Caio Azevedo", phone: "+5531910981032", firstContactAt: "2026-09-14T12:30:00" },

  { id: 45, name: null, phone: "+5541909872043", firstContactAt: "2026-09-15T15:55:00" },

  { id: 46, name: "Vanessa Tavares", phone: "+5551910983054", firstContactAt: "2026-09-16T18:15:00" },

  { id: 47, name: "Diego Machado", phone: "+5511909874065", firstContactAt: "2026-09-17T08:20:00" },

  { id: 48, name: "Michele Cunha", phone: "+5521998765076", firstContactAt: "2026-09-18T10:45:00" },

  { id: 49, name: "Samuel Pinto", phone: "+5531909876087", firstContactAt: "2026-09-19T13:10:00" },

  { id: 50, name: "Aline Farias", phone: "+5541998767098", firstContactAt: "2026-09-20T16:35:00" },

  { id: 51, name: "Otávio Peixoto", phone: "+5551909878019", firstContactAt: "2026-09-21T19:00:00" },

  { id: 52, name: null, phone: "+5511998769021", firstContactAt: "2026-09-22T07:15:00" },

  { id: 53, name: "Cristiane Leal", phone: "+5521987651032", firstContactAt: "2026-09-23T09:30:00" },

  { id: 54, name: "Murilo Xavier", phone: "+5531998762043", firstContactAt: "2026-09-24T12:50:00" },

  { id: 55, name: "Elaine Borges", phone: "+5541987653054", firstContactAt: "2026-09-25T15:20:00" },

  { id: 56, name: "Roberto Nunes", phone: "+5551998764065", firstContactAt: "2026-09-26T17:45:00" },

  { id: 57, name: "Vitória Silveira", phone: "+5511987655076", firstContactAt: "2026-09-27T20:10:00" },

  { id: 58, name: "Fábio Torres", phone: "+5521976546087", firstContactAt: "2026-09-28T08:25:00" },

  { id: 59, name: null, phone: "+5531987657098", firstContactAt: "2026-09-29T10:40:00" },

  { id: 60, name: "Daniela Rezende", phone: "+5541976548019", firstContactAt: "2026-09-30T13:05:00" },

  { id: 61, name: "Marcelo Figueiredo", phone: "+5551987659021", firstContactAt: "2026-10-01T15:30:00" },

  { id: 62, name: "Tainá Guimarães", phone: "+5511976541032", firstContactAt: "2026-10-02T18:00:00" },

  { id: 63, name: "Renan Lopes", phone: "+5521965432043", firstContactAt: "2026-10-03T07:35:00" },

  { id: 64, name: "Milena Andrade", phone: "+5531976543054", firstContactAt: "2026-10-04T09:50:00" },

  { id: 65, name: null, phone: "+5541965434065", firstContactAt: "2026-10-05T12:15:00" },

  { id: 66, name: "Hugo Cavalcante", phone: "+5551976545076", firstContactAt: "2026-10-06T14:40:00" },

  { id: 67, name: "Raquel Brito", phone: "+5511965436087", firstContactAt: "2026-10-07T17:05:00" },

  { id: 68, name: "Enzo Carvalho", phone: "+5521954327098", firstContactAt: "2026-10-08T19:30:00" },

  { id: 69, name: "Tatiane Moraes", phone: "+5531965438019", firstContactAt: "2026-10-09T08:05:00" },

  { id: 70, name: "Vitor Hugo", phone: "+5541954329021", firstContactAt: "2026-10-10T10:20:00" },

  { id: 71, name: "Jéssica Amaral", phone: "+5551965431032", firstContactAt: "2026-10-11T12:45:00" },

  { id: 72, name: null, phone: "+5511954322043", firstContactAt: "2026-10-11T15:10:00" },

  { id: 73, name: "Antônio Lacerda", phone: "+5521943213054", firstContactAt: "2026-10-11T17:35:00" },

  { id: 74, name: "Melissa Siqueira", phone: "+5531954324065", firstContactAt: "2026-10-12T07:50:00" },

  { id: 75, name: "César Augusto", phone: "+5541943215076", firstContactAt: "2026-10-12T10:15:00" },

  { id: 76, name: "Flávia Neves", phone: "+5551954326087", firstContactAt: "2026-10-12T12:40:00" },

  { id: 77, name: "Davi Monteiro", phone: "+5511943217098", firstContactAt: "2026-10-12T15:05:00" },

  { id: 78, name: "Lívia Santana", phone: "+5521932108019", firstContactAt: "2026-10-12T17:30:00" },

  { id: 79, name: null, phone: "+5531943219021", firstContactAt: "2026-10-13T08:00:00" },

  { id: 80, name: "Paulo Henrique", phone: "+5541932101032", firstContactAt: "2026-10-13T10:25:00" },

  { id: 81, name: "Alessandra Paiva", phone: "+5551943212043", firstContactAt: "2026-10-13T12:50:00" },

  { id: 82, name: "Wesley Martins", phone: "+5511932103054", firstContactAt: "2026-10-13T15:15:00" },

  { id: 83, name: "Emanuelle Dias", phone: "+5521921094065", firstContactAt: "2026-10-13T17:40:00" },

  { id: 84, name: "Ruan Oliveira", phone: "+5531932105076", firstContactAt: "2026-10-14T08:10:00" },

  { id: 85, name: null, phone: "+5541921096087", firstContactAt: "2026-10-14T10:35:00" },

  { id: 86, name: "Cíntia Ramos", phone: "+5551932107098", firstContactAt: "2026-10-14T13:00:00" },

  { id: 87, name: "Jorge Luiz", phone: "+5511921098019", firstContactAt: "2026-10-14T15:25:00" },

  { id: 88, name: "Estela Martins", phone: "+5521910989021", firstContactAt: "2026-10-14T17:50:00" },

  { id: 89, name: "Alex Sandro", phone: "+5531921091032", firstContactAt: "2026-10-15T08:20:00" },

  { id: 90, name: "Priscila Nogueira", phone: "+5541910982043", firstContactAt: "2026-10-15T10:45:00" },

  { id: 91, name: null, phone: "+5551921093054", firstContactAt: "2026-10-15T13:10:00" },

  { id: 92, name: "Márcia Helena", phone: "+5511910984065", firstContactAt: "2026-10-15T15:35:00" },

  { id: 93, name: "Igor Matias", phone: "+5521909875076", firstContactAt: "2026-10-15T18:00:00" },

  { id: 94, name: "Nicolas Ferreira", phone: "+5531910986087", firstContactAt: "2026-10-16T08:30:00" },

  { id: 95, name: "Sara Cristina", phone: "+5541909877098", firstContactAt: "2026-10-16T09:15:00" },

  { id: 96, name: "Arthur Mendes", phone: "+5551910988019", firstContactAt: "2026-10-16T10:00:00" },

  { id: 97, name: null, phone: "+5511909879021", firstContactAt: "2026-10-16T11:20:00" },

  { id: 98, name: "Lorena Batista", phone: "+5521997651032", firstContactAt: "2026-10-16T13:45:00" },

  { id: 99, name: "Miguel Ângelo", phone: "+5531909872043", firstContactAt: "2026-10-16T15:10:00" },

  { id: 100, name: "Isadora Freire", phone: "+5541997653054", firstContactAt: "2026-10-16T16:30:00" },

];



// Dados extras só para exercitar paginação/busca. Remova ao ligar na API.

const extraNames = [

  "Camila Ribeiro", "Diego Fernandes", "Fernanda Costa", "Gustavo Rocha",

  "Helena Martins", "Igor Nogueira", "Juliana Souza", "Kleber Duarte",

  "Larissa Moura", "Marcos Vieira", "Natália Barros", "Otávio Campos",

  "Patrícia Gomes", "Rafael Mendes", "Sabrina Lopes", "Thiago Pires",

  "Úrsula Neves", "Vinícius Araújo", "Wesley Cardoso", "Yasmin Freitas",

  "Zeca Farias",

];

const ddds = ["11", "21", "31", "41", "47", "48", "51", "61"];



const extraContacts: Contact[] = extraNames.map((name, i) => ({

  id: baseContacts.length + i + 1,

  // Alguns sem nome, como o WhatsApp faz quando o perfil não é público.

  name: i % 7 === 3 ? null : name,

  phone: `+55${ddds[i % ddds.length]}9${String(80000000 + i * 137531).slice(0, 8)}`,

  firstContactAt: `2026-08-${String(7 + (i % 20)).padStart(2, "0")}T${String(8 + (i % 12)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}:00`,

}));



const contacts: Contact[] = [...baseContacts, ...extraContacts];


export const titlesContacts = [

  {
    id: 1,
    text: "Nome",
  },
  {
    id: 2,
    text: "Telefone",
  },
  {
    id: 3,
    text: "Primeiro Contato",
  },

]

export const defaultContacts: ItensTableProps[] = contacts.map((contact) => ({
  id: contact.id,
  columns: [
    {
      id: 1,
      text: "Nome",
      value: contact.name ?? "Sem nome",
    },
    {
      id: 2,
      text: "Telefone",
      value: contact.phone,
    },
    {
      id: 3,
      text: "Data do primeiro contato",
      value: contact.firstContactAt,
    },
  ],
}));