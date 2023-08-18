const Title = ({ children }: { children: any }) => {
  return (
    <div className="inline-block ml-[3vw]">
      <p className="text-2xl font-bold text-white">{children}</p>
    </div>
  );
};

export default Title;
