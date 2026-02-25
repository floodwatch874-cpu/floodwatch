export default function IconBox({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div
      className="flex items-center justify-center w-10 h-10 border rounded-xl shrink-0"
      style={
        color
          ? { color, backgroundColor: `${color}25` }
          : { backgroundColor: 'white' }
      }
    >
      {children}
    </div>
  );
}
