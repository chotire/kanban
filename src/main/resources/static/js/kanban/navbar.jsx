var KanbanDropdown = React.createClass({
  handleChange: function(e) {
    location.href = "/kanbans/" + e.target.value
  },
  render: function() {
    var options = this.props.kanbans.map(function(kanban) {
      return (
        <option value={kanban.id} key={kanban.id}>{kanban.name}</option>
      );
    });
    return (
      <div className="form-group">
        <select className="form-control" value={kanbanId} onChange={this.handleChange}>
          {options}
        </select>
      </div>
    );
  }
});

var Navbar = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Kanban</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <form className="navbar-form navbar-right">
              <KanbanDropdown kanbans={this.props.kanbans} />
              <PanelAddButton />
              <MemberAddButton />
            </form>
          </div>
        </div>
      </nav>
    );
  }
});
window.Navbar = Navbar;