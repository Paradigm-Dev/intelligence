import electron from "electron";
import path from "path";
import fs from "fs";

const defaults = {
  bounds: { width: 1300, height: 800 },
  objects: [
    {
      icon: "mdi-account",
      title: "Person",
      description: "A human being",
      keys: ["name", "gender", "date of birth", "ssn"],
      preview: "name",
      category: "personal",
    },
    {
      icon: "mdi-car",
      title: "Car",
      description: "An automobile used for transportation of humans",
      keys: ["vin", "plate", "make", "model", "year"],
      preview: "plate",
      category: "vehicle",
    },
    {
      icon: "mdi-home",
      title: "House",
      description: "A building used as a dwelling for humans",
      keys: ["address"],
      preview: "address",
      category: "location",
    },
    {
      icon: "mdi-phone",
      title: "Phone",
      description:
        "A device used for over-the-air communications between humans",
      keys: ["phone number", "make", "model", "imei"],
      preview: "phone number",
      category: "tech",
    },
    {
      icon: "mdi-school",
      title: "Educational Institution",
      description: "A place on Earth in which humans gain knowledge",
      keys: ["name", "address", "educational level"],
      preview: "name",
      category: "personal",
    },
    {
      icon: "mdi-christianity",
      title: "Religious Group",
      description: "A group of humans who believe in some sort of higher power",
      keys: ["name", "leader"],
      preview: "name",
      category: "group",
    },
    {
      icon: "mdi-office-building",
      title: "Company",
      description:
        "A group of humans who work for another human, who is in charge and produces some sort of product or service",
      keys: ["name", "hq address", "type", "boss"],
      preview: "name",
      category: "group",
    },
    {
      icon: "mdi-at",
      title: "Email",
      description:
        "An electronic mailbox in which humans use to communicate via the Internet",
      keys: ["email"],
      preview: "email",
      category: "tech",
    },
    {
      icon: "mdi-lock",
      title: "Password",
      description: "A string that humans use to authenticate over the Internet",
      keys: ["password"],
      preview: "password",
      category: "personal",
    },
    {
      icon: "mdi-map-marker",
      title: "Location",
      description: "A location on Mother Earth",
      keys: [
        "name",
        "street address",
        "city",
        "county",
        "state/province",
        "country",
        "zip",
        "coordinates",
      ],
      preview: "name",
      category: "location",
    },
    {
      icon: "mdi-lan",
      title: "Computer Network",
      description: "A network of computers that communicate with each other",
      keys: [
        "name",
        "ip range",
        "subnet mask",
        "default gateway",
        "speed",
        "internet?",
        "dhcp?",
        "dns",
      ],
      preview: "name",
      category: "tech",
    },
    {
      icon: "mdi-forum",
      title: "Meeting",
      description: "A gathering of humans to discuss business",
      keys: ["name", "date", "time", "address", "held by", "pertaining to"],
      preview: "name",
      category: "event",
    },
    {
      icon: "mdi-account-multiple",
      title: "Conversation",
      description: "A discussion between at least two humans",
      keys: ["name", "date", "time", "address", "involving"],
      preview: "name",
      category: "event",
    },
    {
      icon: "mdi-alert",
      title: "Incident",
      description: "An event or occurrance involving at least one human",
      keys: ["name", "date", "time", "address", "involving"],
      preview: "name",
      category: "event",
    },
  ],
};

class Store {
  constructor() {
    const userDataPath = (electron.app || electron.remote.app).getPath(
      "userData"
    );
    this.path = path.join(userDataPath, "settings.json");

    this.data = parseDataFile(this.path);
  }

  get(key) {
    return this.data[key];
  }

  set(key, val) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath) {
  // try {
  //   return JSON.parse(fs.readFileSync(filePath));
  // } catch (error) {
  return defaults;
  // }
}

export default Store;
