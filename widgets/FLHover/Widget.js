define([
  'dojo/_base/declare', 'jimu/BaseWidget',
  'jimu/LayerStructure', 'dojo/_base/lang'
],
function(declare, BaseWidget, LayerStructure, lang) {
  return declare([BaseWidget], {

    baseClass: 'widget-fl-hover',
    lyrObj: null,
    lyrObjEvt: null,

    postCreate: function() {
      this.inherited(arguments);
    },

    startup: function() {
      this.inherited(arguments);
      this.layerStructure  = LayerStructure.getInstance();
    },

    onOpen: function(){
      var lyrNode = this.layerStructure.getNodeById(this.config.layerId);
      if(lyrNode){
        lyrNode.getLayerObject().then(lang.hitch(this, function(layer){
          this.lyrObj = layer;
        }));
      }
      if(this.lyrObj){
        this.own(this.lyrObjEvt = this.lyrObj.on("mouse-over", lang.hitch(this, function(evt){
          this.map.infoWindow.setFeatures([evt.graphic]);
          this.map.infoWindow.show(evt.mapPoint);
        })));
      }
    },

    onClose: function(){
      if(this.lyrObjEvt){
        this.lyrObjEvt.remove();
      }
      if(this.map.infoWindow.isShowing){
        this.map.infoWindow.hide();
      }
    }
  });
});