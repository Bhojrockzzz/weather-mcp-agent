const { getWeather } = require("./weatherTool");

const toolRegistry = {
  get_weather: async ({ city }) => {
    return await getWeather(city);
  }
};

module.exports = { toolRegistry };