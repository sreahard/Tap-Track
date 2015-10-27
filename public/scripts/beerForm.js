var BeerForm = React.createClass({

  handleSubmit: function(e){

      e.preventDefault();

      var name = React.findDOMNode(this.refs.name).value.trim();
      var category = React.findDOMNode(this.refs.category).value.trim();
      var ibu = React.findDOMNode(this.refs.ibu).value.trim();
      var abv = React.findDOMNode(this.refs.abv).value.trim();
      var location = React.findDOMNode(this.refs.location).value.trim();
      var brewery = React.findDOMNode(this.refs.brewery).value.trim();
      var description = React.findDOMNode(this.refs.description).value.trim();

      


      if(!name){
        return;
      }

      var data = ({name: name, category: category, ibu: ibu, abv: abv, location: location, brewery: brewery, description: description});

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
  }
  ,


render: function() {
      return (
               <div className="container">
              <form>
                  <div className="form-group">
                      <label>Beer Name</label>
                      <input type="text" className="form-control" ref="name" placeholder="Beer Name"/>
                  </div>
                  <div className="form-group">
                      <label>Type of Beer </label>
                      <input type="author" className="form-control" ref="category" placeholder="Type of Beer"/>
                  </div>
                  <div className="form-group">
                      <label>IBU</label>
                      <input className="form-control" ref="ibu" placeholder="IBU"/>
                  </div>
                  <div className="form-group">
                      <label>ABV</label>
                      <input className="form-control" ref="abv" placeholder="ABV"/>
                  </div><div className="form-group">
                      <label>Location</label>
                      <input className="form-control" ref="location" placeholder="Location"/>
                  </div><div className="form-group">
                      <label>Brewery</label>
                      <input className="form-control" ref="brewery" placeholder="Brewery"/>
                  </div><div className="form-group">
                      <label>Description</label>
                      <textarea  rows="15" className="form-control" ref="description" placeholder="Description"></textarea>
                  </div>
                  <button onClick={this.handleSubmit} type="submit" className="btn btn-default"> Submit </button>
              </form>
               </div>
          );
  }
});

React.render(<BeerForm url="/api/beer/"/>, document.getElementById('beerForm'));