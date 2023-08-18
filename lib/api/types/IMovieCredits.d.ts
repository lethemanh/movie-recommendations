interface IMovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

interface Member {
  adult: boolean;
  gender: 1 | 2 | undefined;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: string;
  profile_path: string;
}
type CrewMember = Member & {
  credit_id: string;
  department: string;
  job: string;
};

type CastMember = Member & {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};
