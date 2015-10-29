var App = React.createClass({

    getInitialState () {
    return {
      activeTabIndex: 0
    }, {
      beers: []
    };
  },
    loadBeers: function(beer) {

    $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data){
                console.log(data)
                this.setState({beers:data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log("Broken url is " + this.props.url)
                console.error(this.props.url, status, err.toString());
              }.bind(this)
                    });
    },

    componentDidMount: function(){
    this.loadBeers();
  
},


  handleTabClick (activeTabIndex) {
    this.setState({ activeTabIndex });
  },

  renderTabs () {
    return this.state.beers.map((beer, index) => {
      var style = this.state.activeTabIndex === index ?
        styles.activeTab : styles.tab;
      var clickHandler = this.handleTabClick.bind(this, index);
      return (
        <div key={beer} className="beer-badge" style={style} onClick={clickHandler}>
          {beer.category}
        </div>
      );
    });
  },

  renderPanel () {
    var beer = this.state.beers[this.state.activeTabIndex];
    return (
      <div className="col-sm-6 col-md-4">
            <div className="row beer-display">

                <div className="thumbnail">
                    <img src="http://beerhold.it/365/400/" alt="Lorem Pixel"/>
                    <div className="caption">
                        <h3>{beer}</h3><br/>
                        <h4>
                        ABV {beer}%/{beer} IBU/{beer}
                        </h4>
                        <hr className="short-rule"/>                        
                        <p className="brewery">
                        {beer}
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

React.render(<App url="/api/beer/"/>, document.getElementById("testing"));