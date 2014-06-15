pjs.config({
      log: 'stdout',
      format: 'json',
      writer: 'file',
      outFile: 'output.json'
});

pjs.addSuite({
        // single URL or array
        url: 'http://en.wikipedia.org/wiki/List_of_towns_in_Vermont',
        // single function or array, evaluated in the client
        //scraper: function() {
        //  return _pjs.getText('#sortable_table_id_0 tr td:nth-child(2)');
        //}
        scraper: function() {
            return $('.wikitable tr').slice(1).map(function() {
                var name = $('td:nth-child(2)', this).text(),
                    county = $('td:nth-child(3)', this).text(),
                    // convert relative URLs to absolute
                    link = _pjs.toFullUrl(
                        $('td:nth-child(2) a', this).attr('href')
                    );
                return {
                    model: "myapp.town",
                    fields: {
                        name: name,
                        county: county,
                        link: link
                    }
                }
            }).toArray(); // don't forget .toArray() if you're using .map()
        }
});
