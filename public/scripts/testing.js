var DATA = [
{id : "56301ae20c165aa13cba3c98", name : "IPA Beer Name", category : "IPA", ibu : "47", abv : "56", location : "Missoula, MT", brewery : "Lolo", description : "Good beer 1!"},
{id : "56301ae20c165aa13cba3c97", name : "Fresh Hop Beer Name", category : "Fresh Hop", ibu : "47", abv : "56", location : "Missoula, MT", brewery : "Lolo", description : "Good beer 2"},
{id : "56301ae20c165aa13cba3c96", name : "Cider Name", category : "Cider", ibu : "47", abv : "56", location : "Missoula, MT", brewery : "Lolo", description : "Good beer 3"},
]
var App = React.createClass({

  getInitialState () {
    return {
      activeTabIndex: 0
    };
  },

  handleTabClick (activeTabIndex) {
    this.setState({ activeTabIndex });
  },

  renderTabs () {
    return this.props.beers.map((beer, index) => {
      var style = this.state.activeTabIndex === index ?
        styles.activeTab : styles.tab;
      var clickHandler = this.handleTabClick.bind(this, index);
      return (
        <div key={beer.name} className="beer-badge" style={style} onClick={clickHandler}>
          {beer.category}
        </div>
      );
    });
  },

  renderPanel () {
    var beer = this.props.beers[this.state.activeTabIndex];
    return (
      <div className="col-sm-6 col-md-4">
                            <div className="row beer-display">

                <div className="thumbnail">
                    <img src="http://beerhold.it/365/400/" alt="Lorem Pixel"/>
                    <div className="caption">
                        <h3>{beer.name}</h3><br/>
                        <h4>
                        ABV {beer.abv}%/{beer.ibu} IBU/{beer.location}
                        </h4>
                        <hr className="short-rule"/>                        
                        <p className="brewery">
                        {beer.brewery}
                        </p>

                    </div>
                </div>
                </div>
            </div>
    );
  },

  render () {
    return (
      <div style={styles.app}>
        <div style={styles.tabs}>
          {this.renderTabs()}
        </div>
        <div style={styles.tabPanels}>
          {this.renderPanel()}
        </div>
      </div>
    );

  }
});

var styles = {};

styles.tab = {

  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
};

// styles.activeTab = assign({}, styles.tab, {
//   borderBottomColor: '#000'
// });

styles.tabPanels = {
  padding: 10
};

React.render(<App beers={DATA}/>, document.getElementById("testing"));