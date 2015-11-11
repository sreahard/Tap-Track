var TestForm = React.createClass({

   handleSubmit: function(e){

       e.preventDefault();

       var name = React.findDOMNode(this.refs.name).value.trim();

       if(!name){
         return;
       }

       var data = ({name: name});

           $.ajax({
               url: this.props.url,
               dataType: 'json',
               data: data,
               type:'POST',
                   success: function(response){
                   console.log("posting data!",data, response)
                   document.location='/test2'
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
                <div>
               <form>
                   <div className="form-group">
                       <label>Name</label>
                       <input type="text" className="form-control" ref="name" placeholder="name"/>
                   </div>
                   <button onClick={this.handleSubmit} type="submit" className="btn btn-default"> Submit </button>
               </form>
                </div>
           );
   }
});

React.render(<TestForm url="/api/test/"/>, document.getElementById('testForm'));

