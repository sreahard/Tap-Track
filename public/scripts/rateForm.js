var RateForm = React.createClass({

  handleSubmit: function(id){

      var id = id;

      var tasting_note = React.findDOMNode(this.refs.tasting_note).value.trim();
      var overall = React.findDOMNode(this.refs.overall).value.trim();

     console.log(id)

      if(!overall){
        return;
      }

      var data = ({tasting_note: tasting_note, overall: overall});

          $.ajax({
              url: this.props.url + id,
              dataType: 'json',
              data: data,
              type:'PUT',
                  success: function(response){
                  console.log("posting data!",data, response)
                  document.location='/'
                  }.bind(this),
                  error: function(xhr, status, err){
                      console.log("not posting data!")
                      console.error(this.props.url, status, err.toString());
                  }.bind(this)
          })
  },

    getInitialState: function(){
    return {
      fltr: null
    };
  },

  toggle: function (name) {
    console.log(name);
    this.setState({
      fltr: name
    })
  },
  reToggle: function (id) {
    this.setState({
      fltr: null
    })
  },

render: function() {

    var that = this;

    var getBeerData = this.props.data.map(function(beer){
    if (beer.name === this.state.fltr)

        return(
          <div className="container">  
          <div className="col-sm-6 col-md-4">
          <div className="beer-display">
          <div className="row">
          <div className="well-beer">
          <img src={beer.image} className="img-responsive"/>
          </div>
          </div>
          </div>
          </div>
          <div className="col-sm-6 col-md-6">
          <div className="row">
          <h1>{beer.name}</h1>
          <hr/>
          <form>

          <div className="form-group">
          <h3>Tasting Notes</h3>

          <input type="text" className="form-control" ref="tasting_note"/>
          <h3>Over All Rating</h3>

          <input type="text" className="form-control" ref="overall"/>  


          </div>
          <button onClick={that.handleSubmit.bind(this, beer._id)} type="submit" className="btn btn-primary">Submit</button>
          </form>
          </div>
          </div>
          </div>
          )
      
    }.bind(this));

var beerData = this.props.data.map(function(beer){
     return (
       <div>
            <table className="table">
                   <tbody>
                     <tr>
                      <td style={{width:"80%"}}>{beer.name}</td>
                      <td style={{width:"10%"}}><button onClick={that.toggle.bind(that, beer.name)}><i className="fa fa-pencil"></i></button></td>
                     </tr>
                   </tbody>
                 </table>
       </div>
       )
   });

return (

  <div className="container">
           <div className="col-md-4">

        {beerData}
        </div>
         <div className="col-md-8">

        {getBeerData}
        </div>

  </div>
  );
  }
});  


var App = React.createClass({
  getInitialState: function(){
    return {data: []};
  },

  loadRatings: function(beer) {
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
    this.loadRatings();
  },


  render: function() {
    return (
      <div>
      <RateForm data={this.state.data} />

      </div>
      )
  }
})

React.render(<App url="/api/rating/"/>, document.getElementById('rateForm'));

          // <input id="checkbox1" className="glyphicon glyphicon-star-empty" ref="overall" defaultValue="1" type="checkbox" />
          // <input id="checkbox1" className="glyphicon glyphicon-star-empty" ref="overall" defaultValue="2" type="checkbox" />
          // <input id="checkbox1" className="glyphicon glyphicon-star-empty" ref="overall" defaultValue="3" type="checkbox" />
          // <input id="checkbox1" className="glyphicon glyphicon-star-empty" ref="overall" defaultValue="4" type="checkbox" />
          // <input id="checkbox1" className="glyphicon glyphicon-star-empty" ref="overall" defaultValue="5" type="checkbox" />

          // <button className="tasting-notes" ref="tasting_note" defaultValue="coffeeish">Coffeeish</button>
          // <button className="tasting-notes" ref="tasting_note" defaultValue="caramelly">Caramelly</button>
          // <button className="tasting-notes" ref="tasting_note" defaultValue="fresh">Fresh</button>
          // <button className="tasting-notes" ref="tasting_note" defaultValue="herbal">Herbal</button>
          // <button className="tasting-notes" ref="tasting_note" defaultValue="earthy">Earthy</button>