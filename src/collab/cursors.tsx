import { memo, useEffect } from "react";
import { useUsers } from "y-presence";
import { awareness } from "./store";

export function Cursors() {
  const users = useUsers(awareness);

  useEffect(() => {
    function handlePointerMove(e: PointerEvent) {
      awareness.setLocalStateField("cursor", {
        x: e.clientX,
        y: e.clientY,
      });
    }
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <>
      {Array.from(users.entries()).map(([key, value]) => {
        if (key === awareness.clientID) return null;

        if (!value.cursor || !value.color || !value.name) return null;
        return (
          <Cursor
            key={key}
            cursor={value.cursor}
            color={value.color}
            name={value.name}
          />
        );
      })}
    </>
  );
}

interface CursorProps {
  cursor: {
    x: number;
    y: number;
  };
  color: string;
  name: string;
}

const Cursor = memo(({ cursor, color, name }: CursorProps) => {
  const { x, y } = cursor;

  return (
    <div
      className="absolute pointer-events-none user-select-none left-0 top-0"
      style={{
        transition: "transform 0.5s cubic-bezier(.17,.93,.38,1)",
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
    >
      <svg
        className="cursor"
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        stroke="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>

      <div
        style={{
          backgroundColor: color,
        }}
        className="rounded-md absolute top-5 left-2.5 py-1.5 px-2.5"
      >
        <p className="whitespace-nowrap text-sm text-white">{name}</p>
      </div>
    </div>
  );
});
