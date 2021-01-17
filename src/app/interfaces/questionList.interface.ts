export interface QuestionList {
  answer_count: number;
  content_license: String;
  creation_date: number;
  is_answered: boolean;
  last_activity_date: number;
  link: String;
  owner: Owner;
  question_id: number;
  score: number;
  tags: String[],
  title: String,
  view_count: String

}

export interface Owner {
  accept_rate: number;
  display_name: String;
  link: String;
  profile_image: String;
  reputation: number;
  user_id: number;
  user_type: String;
}

