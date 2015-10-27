var BeerList = React.createClass({
    render: function() {

     var beerData = this.props.data.map(function(beer){
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
           )
     });
            return (
            <div>
            {beerData}
            </div>
            );
    }
});


var App = React.createClass({
    getInitialState: function(){
    return {data: []};
},

    loadBeers: function(beer) {
    // var beerPost = this.state.data;
    $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data){
                console.log("inside success")
                this.setState({data:data});
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


    render: function() {
        return (
            <div>
                <BeerList data={this.state.data}/>
            </div>
            )
    }
})

React.render(<App url="/api/beer/"/>, document.getElementById("beerPosts") )