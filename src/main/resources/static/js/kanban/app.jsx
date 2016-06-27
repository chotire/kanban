var App = React.createClass({
  loadKanbansFromServer: function() {
    $.getJSON(urls.kanbans + "?filters=id,name", function(kanbans) {
      this.setState({kanbans: kanbans});
    }.bind(this));
  },
  loadKanbanFromServer: function() {
    $.getJSON(urls.kanban, function(kanban) {
      this.setState({kanban: kanban});
    }.bind(this));
  },
  handleSubmitPanel: function(panel) {
    var method = (panel.id) ? $.put : $.post;
    var url = (panel.id) ? urls.panels + "/" + panel.id : urls.panels;
    method(url, panel, function() {
      this.loadKanbanFromServer();
      $("#panelModal").modal("hide");
    }.bind(this));
  },
  handleClickPanel: function(id) {
    $.getJSON(urls.panels + "/" + id, function(panel) {
      this.setState({panel: panel});
      $("#panelModal").modal({backdrop: "static"});
    }.bind(this));
  },
  handleDeletePanel: function(id) {
    $.delete(urls.panels + "/" + id, function() {
      this.loadKanbanFromServer();
    }.bind(this));
  },
  handleSubmitCard: function(card) {
    var method = (card.id) ? $.put : $.post;
    var url = urls.panels + "/" + card.panelId + "/cards";
    url = (card.id) ? url + "/" + card.id : url;
    method(url, $.serialize(card), function() {
      this.loadKanbanFromServer();
      $("#cardModal").modal("hide");
    }.bind(this));
  },
  handleClickAddCard: function(panelId) {
    this.setState({card: {panelId: panelId}});
    $("#cardModal").modal({backdrop: "static"});
  },
  handleClickCard: function(panelId, cardId) {
    $.getJSON(urls.panels + "/" + panelId + "/cards/" + cardId, function(card) {
      this.setState({card: card});
      $("#cardModal").modal({backdrop: "static"});
    }.bind(this));
  },
  handleDeleteCard: function(panelId, cardId) {
    $.delete(urls.panels + "/" + panelId + "/cards/" + cardId, function() {
      this.loadKanbanFromServer();
    }.bind(this));
  },
  handleDragAndDropPanel: function(panels) {
    this.loadKanbanFromServer();
  },
  handleDragAndDropCard: function() {
    this.loadKanbanFromServer();
  },
  handleMemberDelete: function(id) {
    $.delete(urls.members + "/" + id, function(members) {
      this.loadKanbanFromServer();
    }.bind(this));
  },
  handleMemberAdd: function(form) {
    $.ajax({
        url: urls.members,
        type: "POST",
        data: new FormData(form),
        enctype: "multipart/form-data",
        processData: false,
        contentType: false,
        cache: false,
        success: function(members) {
          this.state.kanban.members = members;
          this.setState({kanban: this.state.kanban});
          form.reset();
        }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      kanbans: [], 
      kanban: {
        id: "",
        name: "",
        panels: [],
        members: []
      },
      panel: {
        id: "",
        name: "",
        color: "#777777",
        sortOrder: ""
      },
      card: {
        id: "",
        panelId: "",
        name: "",
        dueDate: "",
        color: "#d8d7d7",
        note: "",
        sortOrder: "",
        members: []
      }
    };
  },
  componentDidMount: function() {
    this.loadKanbanFromServer();
    this.loadKanbansFromServer();
  },
  render: function() {
    return (
      <div>
        <Navbar kanbans={this.state.kanbans} />
        <div className="container">
          <PanelContainer 
            panels={this.state.kanban.panels} 
            onDragAndDropPanel={this.handleDragAndDropPanel}
            onDragAndDropCard={this.handleDragAndDropCard}
            onClickPanel={this.handleClickPanel}
            onDeletePanel={this.handleDeletePanel}
            onClickCard={this.handleClickCard}
            onClickAddCard={this.handleClickAddCard}
            onDeleteCard={this.handleDeleteCard}
          />
        </div>
        <hr />
        <footer>
          <p>Copyright &copy; 2016 Chotire. All rights reserved</p>
        </footer>
        <PanelForm 
          panel={this.state.panel}
          onSubmitPanel={this.handleSubmitPanel}
        />
        <CardForm 
          card={this.state.card}
          onSubmitCard={this.handleSubmitCard}
        />
        <MemeberForm 
          members={this.state.kanban.members}
          onMemberDelete={this.handleMemberDelete}
          onMemberAdd={this.handleMemberAdd}
        />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById("content")
);