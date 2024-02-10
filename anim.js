const getRand = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const social_links_count =
  document.querySelector(".social-links").children.length;
let links = [];

let active, prev;

const defParams = {
  easing: "spring(1, 80, 10, 0)",
  scale: 1.2,
  duration: 1000,
  delay: 0,
};

for (let i = 0; i < social_links_count; i++) {
  links.push(i);
}

let index = links[getRand(0, links.length - 1)];

const getLink = (id) => {
  const _id =
    id <= 0 ? 1 : id + 1 > social_links_count ? social_links_count : id + 1;
  return `.social-links a:nth-child(${_id})`;
};

const createAnim = () => {
  prev = active;
  active = anime.timeline(defParams);
  active.add({
    scale: 1.2,
    targets: getLink(index),
    complete: completeHandle,
  });
  active.add({
    targets: getLink(index),
    scale: 1,
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
