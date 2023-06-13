export const ymapMain = () => {
  if (document.querySelector('#ymap-main')) {
    const init = () => {
      const ymapCentral = new ymaps.Map('ymap-main', {
        center: [44.081143, 43.091951],
        zoom: 16,
      });

      ymapCentral.controls.remove('geolocationControl');
      ymapCentral.controls.remove('searchControl');
      ymapCentral.controls.remove('trafficControl');
      ymapCentral.controls.remove('typeSelector');
      ymapCentral.controls.remove('fullscreenControl');
      ymapCentral.controls.remove('rulerControl');

      const myPlacemark = new ymaps.Placemark([44.081143, 43.091951]);

      ymapCentral.geoObjects.add(myPlacemark);
    };

    ymaps.ready(init);
  }
};
