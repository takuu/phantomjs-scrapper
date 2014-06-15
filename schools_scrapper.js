pjs.config({
      log: 'stdout',
      format: 'json',
      writer: 'file',
      outFile: 'json/output_school8.json'
});

pjs.addSuite({
        // single URL or array
        url: 'http://www.greatschools.org/california/los-angeles/schools/?gradeLevels=p&pageSize=100&start=700',
        // single function or array, evaluated in the client
        //scraper: function() {
        //  return _pjs.getText('#sortable_table_id_0 tr td:nth-child(2)');
        //}
        scraper: function() {
            return $('#js-school-search-results-table-body .standard_1-1').slice(1).map(function() {
                var name = $('.js-school-search-result-name a', this).text(),
                    street = $('.js-school-search-result-street', this).text(),
                    type = $('.small.bottom.quiet span:nth-child(1)', this).text(),
                    range = $('.small.bottom.quiet span:nth-child(2)', this).text(),
                    citystatezip = $('.js-school-search-result-citystatezip', this).text()
                    // convert relative URLs to absolute

                return {
                    model: "pre-schools",
                    fields: {
                        name: name,
                        street: street,
                        citystatezip: citystatezip,
                        type: type,
                        range: range
                    }
                }
            }).toArray(); // don't forget .toArray() if you're using .map()
        }
});
