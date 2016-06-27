var KanbanForm = React.createClass({
  handleChange: function(e) {
    this.props.onKanbanChange($("#kanbanModal form").serializeObject());
  },
  handleClick: function(e) {
    this.props.onKanbanDelete();
  },
  componentDidMount: function() {
    var kanbanValidator = $("#kanbanModal form").validate({
      submitHandler: function(form) {
        this.props.onKanbanSubmit();
      }.bind(this)
    });

    $("#kanbanModal").on("hidden.bs.modal", function() {
      $("form", this)[0].reset();
      kanbanValidator.resetForm();
    });
  },
  render: function() {
    var display = {display: (this.props.kanban.id > -1) ? "inline-block" : "none"};

    return (
      <Modal id="kanbanModal" size="modal-sm" title="Kanban">
        <input type="hidden" name="id" ref="id" value={this.props.kanban.id}/>
        <div className="form-group">
          <label className="sr-only" htmlFor="name">Name</label>
          <input type="text" name="name" className="form-control" placeholder="Name" required="true" 
            ref="name" onChange={this.handleChange} value={this.props.kanban.name} />
        </div>
        <ModalFooterButton>
          <button type="button" className="btn btn-danger" style={display} onClick={this.handleClick}>Delete</button>
        </ModalFooterButton>
      </Modal>
    );
  }
});

var Kanban = React.createClass({
  handleClick: function(id, e) {
    if ($(e.target).is("span")) {
      this.props.onKanbanClick(id);
    } else {
      location.href = "/kanbans/" + id;
    }
  },
  render: function() {
    var kanban = this.props.kanban;
    return (
      <li onClick={this.handleClick.bind(this, kanban.id)}>
        <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
        {kanban.name}
      </li>
    );
  }
});

var KanbanList = React.createClass({
  handleClick: function() {
    this.props.onKanbanClick(-1);
  },
  render: function() {
    var kanbanNodes = this.props.kanbans.map(function(kanban) {
      return (
        <Kanban kanban={kanban} onKanbanClick={this.props.onKanbanClick} key={kanban.id} />
      );
    }.bind(this));
    return (
      <ul className="list-inline">
        {kanbanNodes}
        <li onClick={this.handleClick}>
          Create new kanban&hellip;
        </li>
      </ul>
    );
  }
});

var KanbanBox = React.createClass({
  loadKanbansFromServer: function() {
    $.getJSON(this.props.url + "?filters=id,name", function(kanbans) {
      this.setState({kanbans: kanbans});
    }.bind(this));
  },
  handleKanbanSubmit: function() {
    var kanban = this.state.kanban;
    var method = (kanban.id > -1) ? $.put : $.post;
    var url = (kanban.id > -1) ? this.props.url + "/" + kanban.id : this.props.url;
    method(url, kanban, function(kanbans) {
      this.setState({kanbans: kanbans});
      $("#kanbanModal").modal("hide");
    }.bind(this));
  },
  handleKanbanDelete: function() {
    $.delete(this.props.url + "/" + this.state.kanban.id, function(kanbans) {
      this.setState({kanbans: kanbans});
      $("#kanbanModal").modal("hide");
    }.bind(this));
  },
  handleKanbanClick: function(id) {
    $.getJSON(this.props.url + "/" + id + "?filters=id,name", function(kanban) {
      this.setState({kanban: kanban});
      $("#kanbanModal").modal({backdrop: "static"});
    }.bind(this));
  },
  handleKanbanChange: function(kanban) {
    this.setState({kanban: kanban});
  },
  getInitialState: function() {
    return {kanbans: [], kanban: {id: "", name: ""}};
  },
  componentDidMount: function() {
    this.loadKanbansFromServer();
  },
  render: function() {
    return (
      <div>
        <KanbanList kanbans={this.state.kanbans} onKanbanClick={this.handleKanbanClick} />
        <KanbanForm kanban={this.state.kanban} onKanbanSubmit={this.handleKanbanSubmit} onKanbanDelete={this.handleKanbanDelete} onKanbanChange={this.handleKanbanChange} />
      </div>
    );
  }
});

ReactDOM.render(
  <KanbanBox url="/api/kanbans" />,
  document.getElementById("content")
);