import axios from "axios";
import api, { mock, ApiTypes } from "@aspida/resas";

if (process.env.NODE_ENV === "production") {
  // Get API key here: https://opendata.resas-portal.go.jp/form.html
  axios.defaults.headers.common["X-API-KEY"] = process.env.API_KEY;
} else {
  mock();
}

(async () => {
  const prefCode = ApiTypes.PrefCode.Hokkaido;
  const cities = await api().v1.cities.$get({ params: { prefCode } });
  const { cityCode } = cities.result.filter(
    (city) => city.cityName === "札幌市"
  )[0];

  const population = await api().v1.population.composition.perYear.$get({
    params: { prefCode, cityCode },
  });

  console.log(population.result);
})();
