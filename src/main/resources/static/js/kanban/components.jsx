var Modal = React.createClass({
  getDefaultProps: function() {
    return {
      primaryButtonText: "Save"
    }
  },
  render: function() {
    var body = [],
        tail = [],
        button = [];

    React.Children.map(this.props.children, function(child) {
      if (child.type.displayName === "ModalTail") {
        tail.push(child);
      } else if (child.type.displayName === "ModalFooterButton") {
        button.push(child);
      } else {
        body.push(child);
      }
    });

    return (
      <div id={this.props.id} className="modal fade" tabIndex="-1" role="dialog">
        <div className={"modal-dialog " + this.props.size}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <form>
              <div className="modal-body">
                {body}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                {button}
                <button type="submit" className="btn btn-primary">{this.props.primaryButtonText}</button>
              </div>
            </form>
            {tail}
          </div>
        </div>
      </div>
    );
  }
});
window.Modal = Modal;

var ModalTail = React.createClass({
  render: function() {
    return (
      this.props.children
    );
  }
});
window.ModalTail = ModalTail;

var ModalFooterButton = React.createClass({
  render: function() {
    return (
      this.props.children
    );
  }
});
window.ModalFooterButton = ModalFooterButton;

var Button = React.createClass({
  getDefaultProps: function() {
    return {
      type: "button",
      color: "primary",
      size: "",
      icon: ""
    }
  },
  render: function() {
    var glyphicon = "";
    if (this.props.icon) {
      glyphicon = <span className={"glyphicon glyphicon-" + this.props.icon} aria-hidden="true"></span>
    }
    return (
      <div className="form-group">
        <button type={this.props.type} className={"btn btn-" + this.props.color + " " + this.props.size} {...this.props}>
          {glyphicon} {this.props.text}
        </button>
      </div>
    );
  }
});
window.Button = Button;

var Input = React.createClass({
  getDefaultProps: function() {
    return {
      type: "text",
      name: "",
      label: ""
    }
  },
  render: function() {
    return (
      <div className="form-group">
        <label className="sr-only" for={this.props.name}>{this.props.label}</label>
        <input 
          type={this.props.type}
          id={this.props.name}
          name={this.props.name} 
          className={this.props.type === "text" ? "form-control" : ""}
          placeholder={this.props.label}
          {...this.props}
        />
      </div>
    );
  }
});
window.Input = Input;

var TextArea = React.createClass({
  getDefaultProps: function() {
    return {
      name: "",
      label: "",
      rows: 3
    }
  },
  render: function() {
    return (
      <div className="form-group">
        <label className="sr-only" for="note">{this.props.label}</label>
        <textarea 
          id={this.props.name} 
          name={this.props.name}
          className="form-control"
          rows={this.props.rows}
          placeholder={this.props.label}
          {...this.props}
        />
      </div>
    );
  }
});
window.TextArea = TextArea;

var colorpickerOptions = {
  colorSelectors: {
    "#777777": "#777777",
    "#337ab7": "#337ab7",
    "#5cb85c": "#5cb85c",
    "#5bc0de": "#5bc0de",
    "#f0ad4e": "#f0ad4e",
    "#d9534f": "#d9534f"
  },
  template: "<div class='colorpicker dropdown-menu'>" +
            "<div class='colorpicker-selectors' style='font-size: 14px'></div>" +
            "</div>"
}
var ColorPicker = React.createClass({
  getDefaultProps: function() {
    return {
      simple: false
    }
  },
  componentDidMount: function() {
    if (!this.props.simple) {
      delete colorpickerOptions["template"];
    }
    $(this.refs.cp).colorpicker(colorpickerOptions).on("hidePicker", function(e) {
      e.target.name = "color";
      e.target.value = e.color.toHex();
      this.props.onChangeColor(e);
    }.bind(this));
  },
  render: function() {
    return (
      <div className="form-group">
        <label className="sr-only" for="color">Color</label>
        <div className="input-group colorpicker-component" ref="cp">
          <input type="text" name="color" className="form-control" placeholder="Color" value={this.props.colors} onChange={this.props.onChangeColor} {...this.props} />
          <span className="input-group-addon"><i style={{backgroundColor: this.props.preview}}></i></span>
        </div>
      </div>
    );
  }
});
window.ColorPicker = ColorPicker;

var DatePicker = React.createClass({
  getDefaultProps: function() {
    return {
      name: "",
      label: ""
    }
  },
  componentDidMount: function() {
    $(this.refs.date).datetimepicker({format: "YYYY-MM-DD"}).on("dp.change", function (e) {
      e.target.name = this.props.name
      e.target.value = $(this.refs.date).find("input").val();
      this.props.onChangeDate(e);
    }.bind(this));
  },
  render: function() {
    return (
      <div className="form-group">
        <label className="sr-only" for={this.props.name}>{this.props.label}</label>
        <div className="input-group" ref="date">
          <input 
            type="text"
            id={this.props.name}
            name={this.props.name}
            className="form-control"
            placeholder={this.props.label}
            {...this.props}
          />
          <span className="input-group-addon">
            <span className="glyphicon glyphicon-calendar"></span>
          </span>
        </div>
      </div>
    );
  }
});
window.DatePicker = DatePicker;

var Picture = React.createClass({
  getDefaultProps: function() {
    return {
      "data-toggle" : "tooltip",
      "data-placement": "top",
      title: null,
      file: null
    }
  },
  componentDidMount: function() {
    $(this.refs.picture).tooltip();
  },
  render: function() {
    return (
      <img src={this.props.file ? "/api/pictures/" + this.props.file : "/img/anonymous.jpg"} 
        width="20" ref="picture" className="picture" {...this.props} />
    );
  }
});
window.Picture = Picture;

var RemovablePicture = React.createClass({
  render: function() {
    return (
      <div className="thumbnail-remove">
        <Picture {...this.props} />
        <span className="glyphicon glyphicon-remove-circle" />
      </div>
    );
  }
});
window.RemovablePicture = RemovablePicture;