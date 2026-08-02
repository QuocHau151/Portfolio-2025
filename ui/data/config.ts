const config = {
  title: "Quoc Hau DEV",
  description: {
    long: "Personal portfolio of Quoc Hau — a Full-stack Developer building web apps, backends and production systems.",
    short: "Fullstack Builder · Product & Systems",
  },
  keywords: [
    "portfolio",
    "DevOps",
    "Devlopment",
    "Database",
    "AI Docker file optimizer",
    "Finance me",
    "creative technologist",
    "web development",
    "interactive websites",
    "AWS",
    "DevSecOps",
    "AIOps",
    "Azure",
  ],
  author: "Quoc Hau",
  email: "tranlequochau.blc@gmail.com",
  site: "https://quochau.com",

  get ogImg() {
    return this.site + "/assets/og-image.png";
  },
  social: {
    twitter: "",
    linkedin: "",
    instagram: "",
    facebook: "",
    github: "",
  },
};
export { config };
