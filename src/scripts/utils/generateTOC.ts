export function generateTOC(headings: Array<object>) {
  const TOC: Array<object> = [];
  const parentHeadings = new Map();

  headings.forEach((h: any) => {
    const heading = { ...h, subheadings: [] };
    parentHeadings.set(heading.depth, heading);

    if (heading.depth === 2) {
      TOC.push(heading);
    } else {
      parentHeadings.get(heading.depth - 1).subheadings.push(heading);
    }
  });

  return TOC;
}
