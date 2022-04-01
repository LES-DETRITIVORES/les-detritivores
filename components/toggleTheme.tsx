import { useTheme } from "next-themes";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const getNextTheme = (): string => {
    if (theme === "dark") return "light";
    if (theme === "light") return "dark";
    return "light";
  };

  return (
    <button
      type="button"
      className="w-10 h-10 focus:outline-none"
      onClick={() => setTheme(getNextTheme())}
    >
      {(() => {
        switch (theme) {
          case "dark":
            return (
              <span title="Mode Nuit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="hover:animate-pulse focus:animate-pulse w-7 h-7"
                >
                  <path
                    fill="currentColor"
                    d="M332.2 426.4c-93.1 17.7-178.5-53.7-178.5-147.7 0-54.2 29-104 76.1-130.8 7.3-4.1 5.4-15.1-2.8-16.7C108.7 109.4 0 200 0 320c0 106 85.8 192 191.8 192 59.2 0 113.2-26.9 149-71.1 5.3-6.5-.5-16.1-8.6-14.5zM304 96l16-32 32-16-32-16-16-32-16 32-32 16 32 16 16 32zm154.7 85.3L432 128l-26.7 53.3L352 208l53.3 26.7L432 288l26.7-53.3L512 208l-53.3-26.7z"
                  ></path>
                </svg>
              </span>
            );
          case "light":
            return (
              <span title="Mode Jour">
                <svg
                  className="hover:animate-pulse focus:animate-pulse w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="M115.38 136.9l102.11 37.18c35.19-81.54 86.21-144.29 139-173.7-95.88-4.89-188.78 36.96-248.53 111.8-6.69 8.4-2.66 21.05 7.42 24.72zm132.25 48.16l238.48 86.83c35.76-121.38 18.7-231.66-42.63-253.98-7.4-2.7-15.13-4-23.09-4-58.02.01-128.27 69.17-172.76 171.15zM521.48 60.5c6.22 16.3 10.83 34.6 13.2 55.19 5.74 49.89-1.42 108.23-18.95 166.98l102.62 37.36c10.09 3.67 21.31-3.43 21.57-14.17 2.32-95.69-41.91-187.44-118.44-245.36zM560 447.98H321.06L386 269.5l-60.14-21.9-72.9 200.37H16c-8.84 0-16 7.16-16 16.01v32.01C0 504.83 7.16 512 16 512h544c8.84 0 16-7.17 16-16.01v-32.01c0-8.84-7.16-16-16-16z"
                  ></path>
                </svg>
              </span>
            );
          default:
            return "system";
        }
      })()}
    </button>
  );
};

export default ToggleTheme;
