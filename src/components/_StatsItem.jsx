const StatsItem = ({ number, description }) => {
  return (
    <p className="font-medium flex flex-col">
      <span className="text-3xl">{number}+</span>
      <span className="text-xl leading-none">{description}</span>
    </p>
  );
};

export default StatsItem;
