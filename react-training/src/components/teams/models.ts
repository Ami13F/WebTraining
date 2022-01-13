export type Team = {
  id: string | number;
  members: string;
  name: string;
  url: string;
  promotion: string;
};

export type Props = {
  teams: Team[];
};
