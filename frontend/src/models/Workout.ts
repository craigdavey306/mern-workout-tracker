export interface Workout {
  _id: string;
  title: string;
  reps: number;
  load: number;
  createdAt: string;
}

export enum WorkoutActionType {
  SetWorkouts = 'SET_WORKOUTS',
  CreateWorkout = 'CREATE_WORKOUT',
  DeleteWorkout = 'DELETE_WORKOUT',
}
