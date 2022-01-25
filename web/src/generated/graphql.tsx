import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Byte` scalar type represents non-fractional whole numeric values. Byte can represent values between 0 and 255. */
  Byte: any;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
  /** The `Long` scalar type represents non-fractional signed whole 64-bit numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
};

export type Byte__Filter = {
  AND?: InputMaybe<Array<Byte__Filter>>;
  OR?: InputMaybe<Array<Byte__Filter>>;
  isFixedSize?: InputMaybe<Scalars['Boolean']>;
  isFixedSize_not?: InputMaybe<Scalars['Boolean']>;
  isReadOnly?: InputMaybe<Scalars['Boolean']>;
  isReadOnly_not?: InputMaybe<Scalars['Boolean']>;
  isSynchronized?: InputMaybe<Scalars['Boolean']>;
  isSynchronized_not?: InputMaybe<Scalars['Boolean']>;
  length?: InputMaybe<Scalars['Int']>;
  length_gt?: InputMaybe<Scalars['Int']>;
  length_gte?: InputMaybe<Scalars['Int']>;
  length_in?: InputMaybe<Array<Scalars['Int']>>;
  length_lt?: InputMaybe<Scalars['Int']>;
  length_lte?: InputMaybe<Scalars['Int']>;
  length_not?: InputMaybe<Scalars['Int']>;
  length_not_gt?: InputMaybe<Scalars['Int']>;
  length_not_gte?: InputMaybe<Scalars['Int']>;
  length_not_in?: InputMaybe<Array<Scalars['Int']>>;
  length_not_lt?: InputMaybe<Scalars['Int']>;
  length_not_lte?: InputMaybe<Scalars['Int']>;
  longLength?: InputMaybe<Scalars['Long']>;
  longLength_gt?: InputMaybe<Scalars['Long']>;
  longLength_gte?: InputMaybe<Scalars['Long']>;
  longLength_in?: InputMaybe<Array<Scalars['Long']>>;
  longLength_lt?: InputMaybe<Scalars['Long']>;
  longLength_lte?: InputMaybe<Scalars['Long']>;
  longLength_not?: InputMaybe<Scalars['Long']>;
  longLength_not_gt?: InputMaybe<Scalars['Long']>;
  longLength_not_gte?: InputMaybe<Scalars['Long']>;
  longLength_not_in?: InputMaybe<Array<Scalars['Long']>>;
  longLength_not_lt?: InputMaybe<Scalars['Long']>;
  longLength_not_lte?: InputMaybe<Scalars['Long']>;
  rank?: InputMaybe<Scalars['Int']>;
  rank_gt?: InputMaybe<Scalars['Int']>;
  rank_gte?: InputMaybe<Scalars['Int']>;
  rank_in?: InputMaybe<Array<Scalars['Int']>>;
  rank_lt?: InputMaybe<Scalars['Int']>;
  rank_lte?: InputMaybe<Scalars['Int']>;
  rank_not?: InputMaybe<Scalars['Int']>;
  rank_not_gt?: InputMaybe<Scalars['Int']>;
  rank_not_gte?: InputMaybe<Scalars['Int']>;
  rank_not_in?: InputMaybe<Array<Scalars['Int']>>;
  rank_not_lt?: InputMaybe<Scalars['Int']>;
  rank_not_lte?: InputMaybe<Scalars['Int']>;
};

export type CategoryViewModel = {
  __typename?: 'CategoryViewModel';
  categoryId: Scalars['String'];
  exercises: Scalars['Int'];
  organizationId: Scalars['String'];
  title: Scalars['String'];
};

export type CategoryViewModelFilter = {
  AND?: InputMaybe<Array<CategoryViewModelFilter>>;
  OR?: InputMaybe<Array<CategoryViewModelFilter>>;
  categoryId?: InputMaybe<Scalars['String']>;
  categoryId_contains?: InputMaybe<Scalars['String']>;
  categoryId_ends_with?: InputMaybe<Scalars['String']>;
  categoryId_in?: InputMaybe<Array<Scalars['String']>>;
  categoryId_not?: InputMaybe<Scalars['String']>;
  categoryId_not_contains?: InputMaybe<Scalars['String']>;
  categoryId_not_ends_with?: InputMaybe<Scalars['String']>;
  categoryId_not_in?: InputMaybe<Array<Scalars['String']>>;
  categoryId_not_starts_with?: InputMaybe<Scalars['String']>;
  categoryId_starts_with?: InputMaybe<Scalars['String']>;
  exercises?: InputMaybe<Scalars['Int']>;
  exercises_gt?: InputMaybe<Scalars['Int']>;
  exercises_gte?: InputMaybe<Scalars['Int']>;
  exercises_in?: InputMaybe<Array<Scalars['Int']>>;
  exercises_lt?: InputMaybe<Scalars['Int']>;
  exercises_lte?: InputMaybe<Scalars['Int']>;
  exercises_not?: InputMaybe<Scalars['Int']>;
  exercises_not_gt?: InputMaybe<Scalars['Int']>;
  exercises_not_gte?: InputMaybe<Scalars['Int']>;
  exercises_not_in?: InputMaybe<Array<Scalars['Int']>>;
  exercises_not_lt?: InputMaybe<Scalars['Int']>;
  exercises_not_lte?: InputMaybe<Scalars['Int']>;
  organizationId?: InputMaybe<Scalars['String']>;
  organizationId_contains?: InputMaybe<Scalars['String']>;
  organizationId_ends_with?: InputMaybe<Scalars['String']>;
  organizationId_in?: InputMaybe<Array<Scalars['String']>>;
  organizationId_not?: InputMaybe<Scalars['String']>;
  organizationId_not_contains?: InputMaybe<Scalars['String']>;
  organizationId_not_ends_with?: InputMaybe<Scalars['String']>;
  organizationId_not_in?: InputMaybe<Array<Scalars['String']>>;
  organizationId_not_starts_with?: InputMaybe<Scalars['String']>;
  organizationId_starts_with?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_ends_with?: InputMaybe<Scalars['String']>;
  title_in?: InputMaybe<Array<Scalars['String']>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<Scalars['String']>>;
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  title_starts_with?: InputMaybe<Scalars['String']>;
};

export type Exercise = {
  __typename?: 'Exercise';
  categoryId: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  exerciseId: Scalars['String'];
  /** @deprecated No longer supported. */
  files?: Maybe<Array<Array<Scalars['Byte']>>>;
  filesUrl?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  planId?: Maybe<Scalars['String']>;
  series: Array<Serie>;
};

export type ExerciseFilter = {
  AND?: InputMaybe<Array<ExerciseFilter>>;
  OR?: InputMaybe<Array<ExerciseFilter>>;
  categoryId?: InputMaybe<Scalars['String']>;
  categoryId_contains?: InputMaybe<Scalars['String']>;
  categoryId_ends_with?: InputMaybe<Scalars['String']>;
  categoryId_in?: InputMaybe<Array<Scalars['String']>>;
  categoryId_not?: InputMaybe<Scalars['String']>;
  categoryId_not_contains?: InputMaybe<Scalars['String']>;
  categoryId_not_ends_with?: InputMaybe<Scalars['String']>;
  categoryId_not_in?: InputMaybe<Array<Scalars['String']>>;
  categoryId_not_starts_with?: InputMaybe<Scalars['String']>;
  categoryId_starts_with?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  exerciseId?: InputMaybe<Scalars['String']>;
  exerciseId_contains?: InputMaybe<Scalars['String']>;
  exerciseId_ends_with?: InputMaybe<Scalars['String']>;
  exerciseId_in?: InputMaybe<Array<Scalars['String']>>;
  exerciseId_not?: InputMaybe<Scalars['String']>;
  exerciseId_not_contains?: InputMaybe<Scalars['String']>;
  exerciseId_not_ends_with?: InputMaybe<Scalars['String']>;
  exerciseId_not_in?: InputMaybe<Array<Scalars['String']>>;
  exerciseId_not_starts_with?: InputMaybe<Scalars['String']>;
  exerciseId_starts_with?: InputMaybe<Scalars['String']>;
  filesUrl_all?: InputMaybe<ISingleFilterOfStringFilter>;
  filesUrl_any?: InputMaybe<Scalars['Boolean']>;
  filesUrl_none?: InputMaybe<ISingleFilterOfStringFilter>;
  filesUrl_some?: InputMaybe<ISingleFilterOfStringFilter>;
  files_all?: InputMaybe<Byte__Filter>;
  files_any?: InputMaybe<Scalars['Boolean']>;
  files_none?: InputMaybe<Byte__Filter>;
  files_some?: InputMaybe<Byte__Filter>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  planId?: InputMaybe<Scalars['String']>;
  planId_contains?: InputMaybe<Scalars['String']>;
  planId_ends_with?: InputMaybe<Scalars['String']>;
  planId_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  planId_not?: InputMaybe<Scalars['String']>;
  planId_not_contains?: InputMaybe<Scalars['String']>;
  planId_not_ends_with?: InputMaybe<Scalars['String']>;
  planId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  planId_not_starts_with?: InputMaybe<Scalars['String']>;
  planId_starts_with?: InputMaybe<Scalars['String']>;
  series_all?: InputMaybe<SerieFilter>;
  series_any?: InputMaybe<Scalars['Boolean']>;
  series_none?: InputMaybe<SerieFilter>;
  series_some?: InputMaybe<SerieFilter>;
};

export type ExerciseViewModel = {
  __typename?: 'ExerciseViewModel';
  categoryId: Scalars['String'];
  categoryName?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  exerciseId: Scalars['String'];
  files?: Maybe<Array<Array<Scalars['Byte']>>>;
  filesUrl?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  planId?: Maybe<Scalars['String']>;
  series?: Maybe<Array<Serie>>;
};

export type ExerciseViewModelFilter = {
  AND?: InputMaybe<Array<ExerciseViewModelFilter>>;
  OR?: InputMaybe<Array<ExerciseViewModelFilter>>;
  categoryId?: InputMaybe<Scalars['String']>;
  categoryId_contains?: InputMaybe<Scalars['String']>;
  categoryId_ends_with?: InputMaybe<Scalars['String']>;
  categoryId_in?: InputMaybe<Array<Scalars['String']>>;
  categoryId_not?: InputMaybe<Scalars['String']>;
  categoryId_not_contains?: InputMaybe<Scalars['String']>;
  categoryId_not_ends_with?: InputMaybe<Scalars['String']>;
  categoryId_not_in?: InputMaybe<Array<Scalars['String']>>;
  categoryId_not_starts_with?: InputMaybe<Scalars['String']>;
  categoryId_starts_with?: InputMaybe<Scalars['String']>;
  categoryName?: InputMaybe<Scalars['String']>;
  categoryName_contains?: InputMaybe<Scalars['String']>;
  categoryName_ends_with?: InputMaybe<Scalars['String']>;
  categoryName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  categoryName_not?: InputMaybe<Scalars['String']>;
  categoryName_not_contains?: InputMaybe<Scalars['String']>;
  categoryName_not_ends_with?: InputMaybe<Scalars['String']>;
  categoryName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  categoryName_not_starts_with?: InputMaybe<Scalars['String']>;
  categoryName_starts_with?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  exerciseId?: InputMaybe<Scalars['String']>;
  exerciseId_contains?: InputMaybe<Scalars['String']>;
  exerciseId_ends_with?: InputMaybe<Scalars['String']>;
  exerciseId_in?: InputMaybe<Array<Scalars['String']>>;
  exerciseId_not?: InputMaybe<Scalars['String']>;
  exerciseId_not_contains?: InputMaybe<Scalars['String']>;
  exerciseId_not_ends_with?: InputMaybe<Scalars['String']>;
  exerciseId_not_in?: InputMaybe<Array<Scalars['String']>>;
  exerciseId_not_starts_with?: InputMaybe<Scalars['String']>;
  exerciseId_starts_with?: InputMaybe<Scalars['String']>;
  filesUrl_all?: InputMaybe<ISingleFilterOfStringFilter>;
  filesUrl_any?: InputMaybe<Scalars['Boolean']>;
  filesUrl_none?: InputMaybe<ISingleFilterOfStringFilter>;
  filesUrl_some?: InputMaybe<ISingleFilterOfStringFilter>;
  files_all?: InputMaybe<Byte__Filter>;
  files_any?: InputMaybe<Scalars['Boolean']>;
  files_none?: InputMaybe<Byte__Filter>;
  files_some?: InputMaybe<Byte__Filter>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  planId?: InputMaybe<Scalars['String']>;
  planId_contains?: InputMaybe<Scalars['String']>;
  planId_ends_with?: InputMaybe<Scalars['String']>;
  planId_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  planId_not?: InputMaybe<Scalars['String']>;
  planId_not_contains?: InputMaybe<Scalars['String']>;
  planId_not_ends_with?: InputMaybe<Scalars['String']>;
  planId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  planId_not_starts_with?: InputMaybe<Scalars['String']>;
  planId_starts_with?: InputMaybe<Scalars['String']>;
  series_all?: InputMaybe<SerieFilter>;
  series_any?: InputMaybe<Scalars['Boolean']>;
  series_none?: InputMaybe<SerieFilter>;
  series_some?: InputMaybe<SerieFilter>;
};

export type ISingleFilterOfByteFilter = {
  AND?: InputMaybe<Array<ISingleFilterOfByteFilter>>;
  OR?: InputMaybe<Array<ISingleFilterOfByteFilter>>;
  element?: InputMaybe<Scalars['Byte']>;
  element_gt?: InputMaybe<Scalars['Byte']>;
  element_gte?: InputMaybe<Scalars['Byte']>;
  element_in?: InputMaybe<Array<Scalars['Byte']>>;
  element_lt?: InputMaybe<Scalars['Byte']>;
  element_lte?: InputMaybe<Scalars['Byte']>;
  element_not?: InputMaybe<Scalars['Byte']>;
  element_not_gt?: InputMaybe<Scalars['Byte']>;
  element_not_gte?: InputMaybe<Scalars['Byte']>;
  element_not_in?: InputMaybe<Array<Scalars['Byte']>>;
  element_not_lt?: InputMaybe<Scalars['Byte']>;
  element_not_lte?: InputMaybe<Scalars['Byte']>;
};

export type ISingleFilterOfStringFilter = {
  AND?: InputMaybe<Array<ISingleFilterOfStringFilter>>;
  OR?: InputMaybe<Array<ISingleFilterOfStringFilter>>;
  element?: InputMaybe<Scalars['String']>;
  element_contains?: InputMaybe<Scalars['String']>;
  element_ends_with?: InputMaybe<Scalars['String']>;
  element_in?: InputMaybe<Array<Scalars['String']>>;
  element_not?: InputMaybe<Scalars['String']>;
  element_not_contains?: InputMaybe<Scalars['String']>;
  element_not_ends_with?: InputMaybe<Scalars['String']>;
  element_not_in?: InputMaybe<Array<Scalars['String']>>;
  element_not_starts_with?: InputMaybe<Scalars['String']>;
  element_starts_with?: InputMaybe<Scalars['String']>;
};

export type Plan = {
  __typename?: 'Plan';
  creatorId: Scalars['String'];
  creatorName: Scalars['String'];
  exercises: Array<Exercise>;
  organizationId: Scalars['String'];
  planId: Scalars['String'];
  title: Scalars['String'];
  users: Array<UsersPlans>;
};

export type PlanFilter = {
  AND?: InputMaybe<Array<PlanFilter>>;
  OR?: InputMaybe<Array<PlanFilter>>;
  creatorId?: InputMaybe<Scalars['String']>;
  creatorId_contains?: InputMaybe<Scalars['String']>;
  creatorId_ends_with?: InputMaybe<Scalars['String']>;
  creatorId_in?: InputMaybe<Array<Scalars['String']>>;
  creatorId_not?: InputMaybe<Scalars['String']>;
  creatorId_not_contains?: InputMaybe<Scalars['String']>;
  creatorId_not_ends_with?: InputMaybe<Scalars['String']>;
  creatorId_not_in?: InputMaybe<Array<Scalars['String']>>;
  creatorId_not_starts_with?: InputMaybe<Scalars['String']>;
  creatorId_starts_with?: InputMaybe<Scalars['String']>;
  creatorName?: InputMaybe<Scalars['String']>;
  creatorName_contains?: InputMaybe<Scalars['String']>;
  creatorName_ends_with?: InputMaybe<Scalars['String']>;
  creatorName_in?: InputMaybe<Array<Scalars['String']>>;
  creatorName_not?: InputMaybe<Scalars['String']>;
  creatorName_not_contains?: InputMaybe<Scalars['String']>;
  creatorName_not_ends_with?: InputMaybe<Scalars['String']>;
  creatorName_not_in?: InputMaybe<Array<Scalars['String']>>;
  creatorName_not_starts_with?: InputMaybe<Scalars['String']>;
  creatorName_starts_with?: InputMaybe<Scalars['String']>;
  exercises_all?: InputMaybe<ExerciseFilter>;
  exercises_any?: InputMaybe<Scalars['Boolean']>;
  exercises_none?: InputMaybe<ExerciseFilter>;
  exercises_some?: InputMaybe<ExerciseFilter>;
  organizationId?: InputMaybe<Scalars['String']>;
  organizationId_contains?: InputMaybe<Scalars['String']>;
  organizationId_ends_with?: InputMaybe<Scalars['String']>;
  organizationId_in?: InputMaybe<Array<Scalars['String']>>;
  organizationId_not?: InputMaybe<Scalars['String']>;
  organizationId_not_contains?: InputMaybe<Scalars['String']>;
  organizationId_not_ends_with?: InputMaybe<Scalars['String']>;
  organizationId_not_in?: InputMaybe<Array<Scalars['String']>>;
  organizationId_not_starts_with?: InputMaybe<Scalars['String']>;
  organizationId_starts_with?: InputMaybe<Scalars['String']>;
  planId?: InputMaybe<Scalars['String']>;
  planId_contains?: InputMaybe<Scalars['String']>;
  planId_ends_with?: InputMaybe<Scalars['String']>;
  planId_in?: InputMaybe<Array<Scalars['String']>>;
  planId_not?: InputMaybe<Scalars['String']>;
  planId_not_contains?: InputMaybe<Scalars['String']>;
  planId_not_ends_with?: InputMaybe<Scalars['String']>;
  planId_not_in?: InputMaybe<Array<Scalars['String']>>;
  planId_not_starts_with?: InputMaybe<Scalars['String']>;
  planId_starts_with?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_ends_with?: InputMaybe<Scalars['String']>;
  title_in?: InputMaybe<Array<Scalars['String']>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<Scalars['String']>>;
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  title_starts_with?: InputMaybe<Scalars['String']>;
  users_all?: InputMaybe<UsersPlansFilter>;
  users_any?: InputMaybe<Scalars['Boolean']>;
  users_none?: InputMaybe<UsersPlansFilter>;
  users_some?: InputMaybe<UsersPlansFilter>;
};

export type Query = {
  __typename?: 'Query';
  allBaseExercises: Array<ExerciseViewModel>;
  categories: Array<CategoryViewModel>;
  exercise: ExerciseViewModel;
  plans: Array<Plan>;
  serializedExercisesInstances: Array<ExerciseViewModel>;
  users: Array<UserSqlProjection>;
};


export type QueryAllBaseExercisesArgs = {
  where?: InputMaybe<ExerciseViewModelFilter>;
};


export type QueryCategoriesArgs = {
  where?: InputMaybe<CategoryViewModelFilter>;
};


export type QueryExerciseArgs = {
  id: Scalars['String'];
  where?: InputMaybe<ExerciseViewModelFilter>;
};


export type QueryPlansArgs = {
  where?: InputMaybe<PlanFilter>;
};


export type QuerySerializedExercisesInstancesArgs = {
  where?: InputMaybe<ExerciseViewModelFilter>;
};


export type QueryUsersArgs = {
  where?: InputMaybe<UserSqlProjectionFilter>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['String'];
  name: Scalars['String'];
  users: Array<User>;
};

export type RoleFilter = {
  AND?: InputMaybe<Array<RoleFilter>>;
  OR?: InputMaybe<Array<RoleFilter>>;
  id?: InputMaybe<Scalars['String']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  users_all?: InputMaybe<UserFilter>;
  users_any?: InputMaybe<Scalars['Boolean']>;
  users_none?: InputMaybe<UserFilter>;
  users_some?: InputMaybe<UserFilter>;
};

export type Serie = {
  __typename?: 'Serie';
  exerciseId?: Maybe<Scalars['String']>;
  repeats: Scalars['Int'];
  serieId: Scalars['String'];
  times: Scalars['Int'];
  weight: Scalars['Int'];
};

export type SerieFilter = {
  AND?: InputMaybe<Array<SerieFilter>>;
  OR?: InputMaybe<Array<SerieFilter>>;
  exerciseId?: InputMaybe<Scalars['String']>;
  exerciseId_contains?: InputMaybe<Scalars['String']>;
  exerciseId_ends_with?: InputMaybe<Scalars['String']>;
  exerciseId_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  exerciseId_not?: InputMaybe<Scalars['String']>;
  exerciseId_not_contains?: InputMaybe<Scalars['String']>;
  exerciseId_not_ends_with?: InputMaybe<Scalars['String']>;
  exerciseId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  exerciseId_not_starts_with?: InputMaybe<Scalars['String']>;
  exerciseId_starts_with?: InputMaybe<Scalars['String']>;
  repeats?: InputMaybe<Scalars['Int']>;
  repeats_gt?: InputMaybe<Scalars['Int']>;
  repeats_gte?: InputMaybe<Scalars['Int']>;
  repeats_in?: InputMaybe<Array<Scalars['Int']>>;
  repeats_lt?: InputMaybe<Scalars['Int']>;
  repeats_lte?: InputMaybe<Scalars['Int']>;
  repeats_not?: InputMaybe<Scalars['Int']>;
  repeats_not_gt?: InputMaybe<Scalars['Int']>;
  repeats_not_gte?: InputMaybe<Scalars['Int']>;
  repeats_not_in?: InputMaybe<Array<Scalars['Int']>>;
  repeats_not_lt?: InputMaybe<Scalars['Int']>;
  repeats_not_lte?: InputMaybe<Scalars['Int']>;
  serieId?: InputMaybe<Scalars['String']>;
  serieId_contains?: InputMaybe<Scalars['String']>;
  serieId_ends_with?: InputMaybe<Scalars['String']>;
  serieId_in?: InputMaybe<Array<Scalars['String']>>;
  serieId_not?: InputMaybe<Scalars['String']>;
  serieId_not_contains?: InputMaybe<Scalars['String']>;
  serieId_not_ends_with?: InputMaybe<Scalars['String']>;
  serieId_not_in?: InputMaybe<Array<Scalars['String']>>;
  serieId_not_starts_with?: InputMaybe<Scalars['String']>;
  serieId_starts_with?: InputMaybe<Scalars['String']>;
  times?: InputMaybe<Scalars['Int']>;
  times_gt?: InputMaybe<Scalars['Int']>;
  times_gte?: InputMaybe<Scalars['Int']>;
  times_in?: InputMaybe<Array<Scalars['Int']>>;
  times_lt?: InputMaybe<Scalars['Int']>;
  times_lte?: InputMaybe<Scalars['Int']>;
  times_not?: InputMaybe<Scalars['Int']>;
  times_not_gt?: InputMaybe<Scalars['Int']>;
  times_not_gte?: InputMaybe<Scalars['Int']>;
  times_not_in?: InputMaybe<Array<Scalars['Int']>>;
  times_not_lt?: InputMaybe<Scalars['Int']>;
  times_not_lte?: InputMaybe<Scalars['Int']>;
  weight?: InputMaybe<Scalars['Int']>;
  weight_gt?: InputMaybe<Scalars['Int']>;
  weight_gte?: InputMaybe<Scalars['Int']>;
  weight_in?: InputMaybe<Array<Scalars['Int']>>;
  weight_lt?: InputMaybe<Scalars['Int']>;
  weight_lte?: InputMaybe<Scalars['Int']>;
  weight_not?: InputMaybe<Scalars['Int']>;
  weight_not_gt?: InputMaybe<Scalars['Int']>;
  weight_not_gte?: InputMaybe<Scalars['Int']>;
  weight_not_in?: InputMaybe<Array<Scalars['Int']>>;
  weight_not_lt?: InputMaybe<Scalars['Int']>;
  weight_not_lte?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Array<Scalars['Byte']>>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  isActivated: Scalars['Boolean'];
  lastName: Scalars['String'];
  organizationId: Scalars['String'];
  password: Scalars['String'];
  passwordHash: Array<Scalars['Byte']>;
  passwordReset: Scalars['DateTime'];
  passwordSalt: Array<Scalars['Byte']>;
  phoneNumber: Scalars['String'];
  plans: Array<UsersPlans>;
  resetToken?: Maybe<Scalars['String']>;
  resetTokenExpires?: Maybe<Scalars['DateTime']>;
  role: Role;
  roleId: Scalars['String'];
  token: Scalars['String'];
  userId: Scalars['String'];
  usersTrainers: Array<UsersTrainers>;
  verificationToken?: Maybe<Scalars['String']>;
};

export type UserFilter = {
  AND?: InputMaybe<Array<UserFilter>>;
  OR?: InputMaybe<Array<UserFilter>>;
  avatar_all?: InputMaybe<ISingleFilterOfByteFilter>;
  avatar_any?: InputMaybe<Scalars['Boolean']>;
  avatar_none?: InputMaybe<ISingleFilterOfByteFilter>;
  avatar_some?: InputMaybe<ISingleFilterOfByteFilter>;
  email?: InputMaybe<Scalars['String']>;
  email_contains?: InputMaybe<Scalars['String']>;
  email_ends_with?: InputMaybe<Scalars['String']>;
  email_in?: InputMaybe<Array<Scalars['String']>>;
  email_not?: InputMaybe<Scalars['String']>;
  email_not_contains?: InputMaybe<Scalars['String']>;
  email_not_ends_with?: InputMaybe<Scalars['String']>;
  email_not_in?: InputMaybe<Array<Scalars['String']>>;
  email_not_starts_with?: InputMaybe<Scalars['String']>;
  email_starts_with?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  firstName_contains?: InputMaybe<Scalars['String']>;
  firstName_ends_with?: InputMaybe<Scalars['String']>;
  firstName_in?: InputMaybe<Array<Scalars['String']>>;
  firstName_not?: InputMaybe<Scalars['String']>;
  firstName_not_contains?: InputMaybe<Scalars['String']>;
  firstName_not_ends_with?: InputMaybe<Scalars['String']>;
  firstName_not_in?: InputMaybe<Array<Scalars['String']>>;
  firstName_not_starts_with?: InputMaybe<Scalars['String']>;
  firstName_starts_with?: InputMaybe<Scalars['String']>;
  isActivated?: InputMaybe<Scalars['Boolean']>;
  isActivated_not?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  lastName_contains?: InputMaybe<Scalars['String']>;
  lastName_ends_with?: InputMaybe<Scalars['String']>;
  lastName_in?: InputMaybe<Array<Scalars['String']>>;
  lastName_not?: InputMaybe<Scalars['String']>;
  lastName_not_contains?: InputMaybe<Scalars['String']>;
  lastName_not_ends_with?: InputMaybe<Scalars['String']>;
  lastName_not_in?: InputMaybe<Array<Scalars['String']>>;
  lastName_not_starts_with?: InputMaybe<Scalars['String']>;
  lastName_starts_with?: InputMaybe<Scalars['String']>;
  organizationId?: InputMaybe<Scalars['String']>;
  organizationId_contains?: InputMaybe<Scalars['String']>;
  organizationId_ends_with?: InputMaybe<Scalars['String']>;
  organizationId_in?: InputMaybe<Array<Scalars['String']>>;
  organizationId_not?: InputMaybe<Scalars['String']>;
  organizationId_not_contains?: InputMaybe<Scalars['String']>;
  organizationId_not_ends_with?: InputMaybe<Scalars['String']>;
  organizationId_not_in?: InputMaybe<Array<Scalars['String']>>;
  organizationId_not_starts_with?: InputMaybe<Scalars['String']>;
  organizationId_starts_with?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  passwordHash_all?: InputMaybe<ISingleFilterOfByteFilter>;
  passwordHash_any?: InputMaybe<Scalars['Boolean']>;
  passwordHash_none?: InputMaybe<ISingleFilterOfByteFilter>;
  passwordHash_some?: InputMaybe<ISingleFilterOfByteFilter>;
  passwordReset?: InputMaybe<Scalars['DateTime']>;
  passwordReset_gt?: InputMaybe<Scalars['DateTime']>;
  passwordReset_gte?: InputMaybe<Scalars['DateTime']>;
  passwordReset_in?: InputMaybe<Array<Scalars['DateTime']>>;
  passwordReset_lt?: InputMaybe<Scalars['DateTime']>;
  passwordReset_lte?: InputMaybe<Scalars['DateTime']>;
  passwordReset_not?: InputMaybe<Scalars['DateTime']>;
  passwordReset_not_gt?: InputMaybe<Scalars['DateTime']>;
  passwordReset_not_gte?: InputMaybe<Scalars['DateTime']>;
  passwordReset_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  passwordReset_not_lt?: InputMaybe<Scalars['DateTime']>;
  passwordReset_not_lte?: InputMaybe<Scalars['DateTime']>;
  passwordSalt_all?: InputMaybe<ISingleFilterOfByteFilter>;
  passwordSalt_any?: InputMaybe<Scalars['Boolean']>;
  passwordSalt_none?: InputMaybe<ISingleFilterOfByteFilter>;
  passwordSalt_some?: InputMaybe<ISingleFilterOfByteFilter>;
  password_contains?: InputMaybe<Scalars['String']>;
  password_ends_with?: InputMaybe<Scalars['String']>;
  password_in?: InputMaybe<Array<Scalars['String']>>;
  password_not?: InputMaybe<Scalars['String']>;
  password_not_contains?: InputMaybe<Scalars['String']>;
  password_not_ends_with?: InputMaybe<Scalars['String']>;
  password_not_in?: InputMaybe<Array<Scalars['String']>>;
  password_not_starts_with?: InputMaybe<Scalars['String']>;
  password_starts_with?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  phoneNumber_contains?: InputMaybe<Scalars['String']>;
  phoneNumber_ends_with?: InputMaybe<Scalars['String']>;
  phoneNumber_in?: InputMaybe<Array<Scalars['String']>>;
  phoneNumber_not?: InputMaybe<Scalars['String']>;
  phoneNumber_not_contains?: InputMaybe<Scalars['String']>;
  phoneNumber_not_ends_with?: InputMaybe<Scalars['String']>;
  phoneNumber_not_in?: InputMaybe<Array<Scalars['String']>>;
  phoneNumber_not_starts_with?: InputMaybe<Scalars['String']>;
  phoneNumber_starts_with?: InputMaybe<Scalars['String']>;
  plans_all?: InputMaybe<UsersPlansFilter>;
  plans_any?: InputMaybe<Scalars['Boolean']>;
  plans_none?: InputMaybe<UsersPlansFilter>;
  plans_some?: InputMaybe<UsersPlansFilter>;
  resetToken?: InputMaybe<Scalars['String']>;
  resetTokenExpires?: InputMaybe<Scalars['DateTime']>;
  resetTokenExpires_gt?: InputMaybe<Scalars['DateTime']>;
  resetTokenExpires_gte?: InputMaybe<Scalars['DateTime']>;
  resetTokenExpires_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  resetTokenExpires_lt?: InputMaybe<Scalars['DateTime']>;
  resetTokenExpires_lte?: InputMaybe<Scalars['DateTime']>;
  resetTokenExpires_not?: InputMaybe<Scalars['DateTime']>;
  resetTokenExpires_not_gt?: InputMaybe<Scalars['DateTime']>;
  resetTokenExpires_not_gte?: InputMaybe<Scalars['DateTime']>;
  resetTokenExpires_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  resetTokenExpires_not_lt?: InputMaybe<Scalars['DateTime']>;
  resetTokenExpires_not_lte?: InputMaybe<Scalars['DateTime']>;
  resetToken_contains?: InputMaybe<Scalars['String']>;
  resetToken_ends_with?: InputMaybe<Scalars['String']>;
  resetToken_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  resetToken_not?: InputMaybe<Scalars['String']>;
  resetToken_not_contains?: InputMaybe<Scalars['String']>;
  resetToken_not_ends_with?: InputMaybe<Scalars['String']>;
  resetToken_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  resetToken_not_starts_with?: InputMaybe<Scalars['String']>;
  resetToken_starts_with?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleFilter>;
  roleId?: InputMaybe<Scalars['String']>;
  roleId_contains?: InputMaybe<Scalars['String']>;
  roleId_ends_with?: InputMaybe<Scalars['String']>;
  roleId_in?: InputMaybe<Array<Scalars['String']>>;
  roleId_not?: InputMaybe<Scalars['String']>;
  roleId_not_contains?: InputMaybe<Scalars['String']>;
  roleId_not_ends_with?: InputMaybe<Scalars['String']>;
  roleId_not_in?: InputMaybe<Array<Scalars['String']>>;
  roleId_not_starts_with?: InputMaybe<Scalars['String']>;
  roleId_starts_with?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
  userId_contains?: InputMaybe<Scalars['String']>;
  userId_ends_with?: InputMaybe<Scalars['String']>;
  userId_in?: InputMaybe<Array<Scalars['String']>>;
  userId_not?: InputMaybe<Scalars['String']>;
  userId_not_contains?: InputMaybe<Scalars['String']>;
  userId_not_ends_with?: InputMaybe<Scalars['String']>;
  userId_not_in?: InputMaybe<Array<Scalars['String']>>;
  userId_not_starts_with?: InputMaybe<Scalars['String']>;
  userId_starts_with?: InputMaybe<Scalars['String']>;
  usersTrainers_all?: InputMaybe<UsersTrainersFilter>;
  usersTrainers_any?: InputMaybe<Scalars['Boolean']>;
  usersTrainers_none?: InputMaybe<UsersTrainersFilter>;
  usersTrainers_some?: InputMaybe<UsersTrainersFilter>;
  verificationToken?: InputMaybe<Scalars['String']>;
  verificationToken_contains?: InputMaybe<Scalars['String']>;
  verificationToken_ends_with?: InputMaybe<Scalars['String']>;
  verificationToken_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  verificationToken_not?: InputMaybe<Scalars['String']>;
  verificationToken_not_contains?: InputMaybe<Scalars['String']>;
  verificationToken_not_ends_with?: InputMaybe<Scalars['String']>;
  verificationToken_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  verificationToken_not_starts_with?: InputMaybe<Scalars['String']>;
  verificationToken_starts_with?: InputMaybe<Scalars['String']>;
};

export type UserSqlProjection = {
  __typename?: 'UserSqlProjection';
  avatar?: Maybe<Array<Scalars['Byte']>>;
  email: Scalars['String'];
  first_Name: Scalars['String'];
  is_Activated: Scalars['Boolean'];
  last_Name: Scalars['String'];
  organization_Id: Scalars['String'];
  phone_Number: Scalars['String'];
  role: Scalars['String'];
  user_Id: Scalars['String'];
};

export type UserSqlProjectionFilter = {
  AND?: InputMaybe<Array<UserSqlProjectionFilter>>;
  OR?: InputMaybe<Array<UserSqlProjectionFilter>>;
  avatar_all?: InputMaybe<ISingleFilterOfByteFilter>;
  avatar_any?: InputMaybe<Scalars['Boolean']>;
  avatar_none?: InputMaybe<ISingleFilterOfByteFilter>;
  avatar_some?: InputMaybe<ISingleFilterOfByteFilter>;
  email?: InputMaybe<Scalars['String']>;
  email_contains?: InputMaybe<Scalars['String']>;
  email_ends_with?: InputMaybe<Scalars['String']>;
  email_in?: InputMaybe<Array<Scalars['String']>>;
  email_not?: InputMaybe<Scalars['String']>;
  email_not_contains?: InputMaybe<Scalars['String']>;
  email_not_ends_with?: InputMaybe<Scalars['String']>;
  email_not_in?: InputMaybe<Array<Scalars['String']>>;
  email_not_starts_with?: InputMaybe<Scalars['String']>;
  email_starts_with?: InputMaybe<Scalars['String']>;
  first_Name?: InputMaybe<Scalars['String']>;
  first_Name_contains?: InputMaybe<Scalars['String']>;
  first_Name_ends_with?: InputMaybe<Scalars['String']>;
  first_Name_in?: InputMaybe<Array<Scalars['String']>>;
  first_Name_not?: InputMaybe<Scalars['String']>;
  first_Name_not_contains?: InputMaybe<Scalars['String']>;
  first_Name_not_ends_with?: InputMaybe<Scalars['String']>;
  first_Name_not_in?: InputMaybe<Array<Scalars['String']>>;
  first_Name_not_starts_with?: InputMaybe<Scalars['String']>;
  first_Name_starts_with?: InputMaybe<Scalars['String']>;
  is_Activated?: InputMaybe<Scalars['Boolean']>;
  is_Activated_not?: InputMaybe<Scalars['Boolean']>;
  last_Name?: InputMaybe<Scalars['String']>;
  last_Name_contains?: InputMaybe<Scalars['String']>;
  last_Name_ends_with?: InputMaybe<Scalars['String']>;
  last_Name_in?: InputMaybe<Array<Scalars['String']>>;
  last_Name_not?: InputMaybe<Scalars['String']>;
  last_Name_not_contains?: InputMaybe<Scalars['String']>;
  last_Name_not_ends_with?: InputMaybe<Scalars['String']>;
  last_Name_not_in?: InputMaybe<Array<Scalars['String']>>;
  last_Name_not_starts_with?: InputMaybe<Scalars['String']>;
  last_Name_starts_with?: InputMaybe<Scalars['String']>;
  organization_Id?: InputMaybe<Scalars['String']>;
  organization_Id_contains?: InputMaybe<Scalars['String']>;
  organization_Id_ends_with?: InputMaybe<Scalars['String']>;
  organization_Id_in?: InputMaybe<Array<Scalars['String']>>;
  organization_Id_not?: InputMaybe<Scalars['String']>;
  organization_Id_not_contains?: InputMaybe<Scalars['String']>;
  organization_Id_not_ends_with?: InputMaybe<Scalars['String']>;
  organization_Id_not_in?: InputMaybe<Array<Scalars['String']>>;
  organization_Id_not_starts_with?: InputMaybe<Scalars['String']>;
  organization_Id_starts_with?: InputMaybe<Scalars['String']>;
  phone_Number?: InputMaybe<Scalars['String']>;
  phone_Number_contains?: InputMaybe<Scalars['String']>;
  phone_Number_ends_with?: InputMaybe<Scalars['String']>;
  phone_Number_in?: InputMaybe<Array<Scalars['String']>>;
  phone_Number_not?: InputMaybe<Scalars['String']>;
  phone_Number_not_contains?: InputMaybe<Scalars['String']>;
  phone_Number_not_ends_with?: InputMaybe<Scalars['String']>;
  phone_Number_not_in?: InputMaybe<Array<Scalars['String']>>;
  phone_Number_not_starts_with?: InputMaybe<Scalars['String']>;
  phone_Number_starts_with?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  role_contains?: InputMaybe<Scalars['String']>;
  role_ends_with?: InputMaybe<Scalars['String']>;
  role_in?: InputMaybe<Array<Scalars['String']>>;
  role_not?: InputMaybe<Scalars['String']>;
  role_not_contains?: InputMaybe<Scalars['String']>;
  role_not_ends_with?: InputMaybe<Scalars['String']>;
  role_not_in?: InputMaybe<Array<Scalars['String']>>;
  role_not_starts_with?: InputMaybe<Scalars['String']>;
  role_starts_with?: InputMaybe<Scalars['String']>;
  user_Id?: InputMaybe<Scalars['String']>;
  user_Id_contains?: InputMaybe<Scalars['String']>;
  user_Id_ends_with?: InputMaybe<Scalars['String']>;
  user_Id_in?: InputMaybe<Array<Scalars['String']>>;
  user_Id_not?: InputMaybe<Scalars['String']>;
  user_Id_not_contains?: InputMaybe<Scalars['String']>;
  user_Id_not_ends_with?: InputMaybe<Scalars['String']>;
  user_Id_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_Id_not_starts_with?: InputMaybe<Scalars['String']>;
  user_Id_starts_with?: InputMaybe<Scalars['String']>;
};

export type UsersPlans = {
  __typename?: 'UsersPlans';
  plan: Plan;
  planId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type UsersPlansFilter = {
  AND?: InputMaybe<Array<UsersPlansFilter>>;
  OR?: InputMaybe<Array<UsersPlansFilter>>;
  plan?: InputMaybe<PlanFilter>;
  planId?: InputMaybe<Scalars['String']>;
  planId_contains?: InputMaybe<Scalars['String']>;
  planId_ends_with?: InputMaybe<Scalars['String']>;
  planId_in?: InputMaybe<Array<Scalars['String']>>;
  planId_not?: InputMaybe<Scalars['String']>;
  planId_not_contains?: InputMaybe<Scalars['String']>;
  planId_not_ends_with?: InputMaybe<Scalars['String']>;
  planId_not_in?: InputMaybe<Array<Scalars['String']>>;
  planId_not_starts_with?: InputMaybe<Scalars['String']>;
  planId_starts_with?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserFilter>;
  userId?: InputMaybe<Scalars['String']>;
  userId_contains?: InputMaybe<Scalars['String']>;
  userId_ends_with?: InputMaybe<Scalars['String']>;
  userId_in?: InputMaybe<Array<Scalars['String']>>;
  userId_not?: InputMaybe<Scalars['String']>;
  userId_not_contains?: InputMaybe<Scalars['String']>;
  userId_not_ends_with?: InputMaybe<Scalars['String']>;
  userId_not_in?: InputMaybe<Array<Scalars['String']>>;
  userId_not_starts_with?: InputMaybe<Scalars['String']>;
  userId_starts_with?: InputMaybe<Scalars['String']>;
};

export type UsersTrainers = {
  __typename?: 'UsersTrainers';
  client: User;
  clientId: Scalars['String'];
  trainer: User;
  trainerId: Scalars['String'];
};

export type UsersTrainersFilter = {
  AND?: InputMaybe<Array<UsersTrainersFilter>>;
  OR?: InputMaybe<Array<UsersTrainersFilter>>;
  client?: InputMaybe<UserFilter>;
  clientId?: InputMaybe<Scalars['String']>;
  clientId_contains?: InputMaybe<Scalars['String']>;
  clientId_ends_with?: InputMaybe<Scalars['String']>;
  clientId_in?: InputMaybe<Array<Scalars['String']>>;
  clientId_not?: InputMaybe<Scalars['String']>;
  clientId_not_contains?: InputMaybe<Scalars['String']>;
  clientId_not_ends_with?: InputMaybe<Scalars['String']>;
  clientId_not_in?: InputMaybe<Array<Scalars['String']>>;
  clientId_not_starts_with?: InputMaybe<Scalars['String']>;
  clientId_starts_with?: InputMaybe<Scalars['String']>;
  trainer?: InputMaybe<UserFilter>;
  trainerId?: InputMaybe<Scalars['String']>;
  trainerId_contains?: InputMaybe<Scalars['String']>;
  trainerId_ends_with?: InputMaybe<Scalars['String']>;
  trainerId_in?: InputMaybe<Array<Scalars['String']>>;
  trainerId_not?: InputMaybe<Scalars['String']>;
  trainerId_not_contains?: InputMaybe<Scalars['String']>;
  trainerId_not_ends_with?: InputMaybe<Scalars['String']>;
  trainerId_not_in?: InputMaybe<Array<Scalars['String']>>;
  trainerId_not_starts_with?: InputMaybe<Scalars['String']>;
  trainerId_starts_with?: InputMaybe<Scalars['String']>;
};

export type AllBaseExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBaseExercisesQuery = { __typename?: 'Query', allBaseExercises: Array<{ __typename?: 'ExerciseViewModel', exerciseId: string, categoryName?: string | null | undefined, categoryId: string, name: string }> };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'CategoryViewModel', categoryId: string, title: string, exercises: number }> };


export const AllBaseExercisesDocument = gql`
    query allBaseExercises {
  allBaseExercises {
    exerciseId
    categoryName
    categoryId
    name
  }
}
    `;

/**
 * __useAllBaseExercisesQuery__
 *
 * To run a query within a React component, call `useAllBaseExercisesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllBaseExercisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllBaseExercisesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllBaseExercisesQuery(baseOptions?: Apollo.QueryHookOptions<AllBaseExercisesQuery, AllBaseExercisesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllBaseExercisesQuery, AllBaseExercisesQueryVariables>(AllBaseExercisesDocument, options);
      }
export function useAllBaseExercisesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllBaseExercisesQuery, AllBaseExercisesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllBaseExercisesQuery, AllBaseExercisesQueryVariables>(AllBaseExercisesDocument, options);
        }
export type AllBaseExercisesQueryHookResult = ReturnType<typeof useAllBaseExercisesQuery>;
export type AllBaseExercisesLazyQueryHookResult = ReturnType<typeof useAllBaseExercisesLazyQuery>;
export type AllBaseExercisesQueryResult = Apollo.QueryResult<AllBaseExercisesQuery, AllBaseExercisesQueryVariables>;
export const CategoriesDocument = gql`
    query categories {
  categories {
    categoryId
    title
    exercises
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;