import { useUsers } from "y-presence";
import { awareness } from "./store";

export function AvatarStack() {
  const users = useUsers(awareness);

  return (
    <div className="flex">
      {Array.from(users).map(([id, user]) => {
        return (
          <img
            key={id}
            title={user.name}
            className="inline-block h-10 w-10 rounded-full"
            src={`https://frontend-git-meine-mathe-skills-serlo.vercel.app/_assets/img/math-skills/${user.id}.svg`}
            alt={`Avatar of ${user.name}`}
          />
        );
      })}
    </div>
  );
}
