const getRand = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const anim = ({
  target,
  starting,
  anim,
  duration = 1500,
  delay = 1500,
  easing = "spring(1, 80, 10, 0)",
}) => {
  const social_links_count = document.querySelectorAll(target).length;
  let links = [];

  let active, prev;

  const defParams = {
    // easing,
    duration,
    delay: 0,
  };

  for (let i = 0; i < social_links_count; i++) {
    links.push(i);
  }

  let index = links[getRand(0, links.length - 1)];

  const getLink = (id) => {
    const _id =
      id <= 0 ? 1 : id + 1 > social_links_count ? social_links_count : id + 1;
    return `${target}:nth-child(${_id})`;
  };

  const createAnim = () => {
    prev = active;
    active = anime.timeline(defParams);
    active.add({
      targets: getLink(index),
      duration,
      delay,
      complete: completeHandle,
      ...anim,
    });
    active.add({
      targets: getLink(index),
      ...starting,
    });
  };

  const completeHandle = () => {
    links = links.filter((item) => item != index);
    if (links.length == 0) {
      for (let i = 0; i < social_links_count; i++) {
        links.push(i);
      }
    }
    const rand = getRand(0, links.length - 1);
    index = links[rand];
    createAnim();
  };

  createAnim();
};

anim({
  target: ".social-links a",
  starting: {
    scale: 1,
    // rotate: "+=345deg"
  },
  anim: {
    scale: 1.5,
    // rotate: "+=15deg"
  },
  duration: 1750,
  delay: 3000
});
