const BubbleText = ({ text }) => {
  return (
    <h2 className="font-serif [font-size:clamp(4rem,-0.4rem+22vw,26rem)] text-center leading-none firefox-leading -mb-[min(1.5rem,1.5%)] z-50 mix-blend-difference select-none block text-zinc-50">
      {text.split("").map((char, idx) => (
        <span
          key={idx}
          className="relative inline-block after:content-[attr(data-char)] after:absolute after:inset-0 after:opacity-0 after:italic after:font-serif after:font-[200] hover:after:opacity-100 hover:after:z-10 after:text-zinc-50  transition-all duration-150 ease-in-out after:transition-all hover:text-zinc-950 after:duration-150 after:ease-in-out"
          data-char={char}
        >
          {char}
        </span>
      ))}
    </h2>
  );
};

export default BubbleText;
