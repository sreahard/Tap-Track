var RateForm = React.createClass({

  handleSubmit: function(e){

      e.preventDefault();

      var beer_id = React.findDOMNode(this.refs.beer_id).value.trim();
      var tasting_note = React.findDOMNode(this.refs.tasting_note).value.trim();
      var user_id = React.findDOMNode(this.refs.user_id).value.trim();
      var overall = React.findDOMNode(this.refs.overall).value.trim();

      if(!beer_id){
        return;
      }

      var data = ({beer_id: beer_id, tasting_note: tasting_note, user_id: user_id, overall: overall, abv: abv, location: location, brewery: brewery, description: description});

          $.ajax({
              url: this.props.url,
              dataType: 'json',
              data: data,
              type:'POST',
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

render: function() {
      return (

               <div className="col-sm-6 col-md-8">
                <div className="row">
                <h1>Enter New Beers</h1>
                <hr/>
                <form>
                  <div className="form-group">
                      <label>Beer Name</label>
                      <input type="text" className="form-control" ref="aroma" placeholder="Beer Name"/>
                  </div>
                  <div className="form-group">
                      <label>appearance URL</label>
                      <input type="text" className="form-control" ref="appearance" placeholder="appearance URL"/>
                  </div>

                  <div className="form-group">
                      <label>Type of Beer </label>
                      <input type="author" className="form-control" ref="taste" placeholder="Type of Beer"/>
                  </div>
                  <div className="form-group">
                      <label>overall</label>
                      <input className="form-control" ref="overall" placeholder="overall"/>
                  </div>
                  <button onClick={this.handleSubmit} type="submit" className="btn btn-default"> Submit </button>
                </form>
               </div>
               </div>

          );
      }
});

React.render(<RateForm url="/api/ratings"/>, document.getElementById('rateForm'));
