document.querySelectorAll('[data-toggle="tooltip"]').forEach(function(element){new coreui.Tooltip(element,{offset:function offset(_ref){var placement=_ref.placement,reference=_ref.reference,popper=_ref.popper;console.log(placement);console.log(reference);console.log(popper);if(placement==='bottom'){return[0,popper.height/2];}else{return[];}}});});