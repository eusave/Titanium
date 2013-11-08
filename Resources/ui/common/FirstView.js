//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#000000',
		text:'+',
		height:'auto',
		width:'auto'
	});
	self.add(label);
	
	//Add behavior for UI
	label.addEventListener('click', function(e) {
		alert(e.source.text);
	});
	
	var text1=Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color: '#336699',
		top: 10, left: 10,
		width: 250, height: 60
	});
	self.add(text1);
	
	
	var text2=Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color: '#336699',
		top: 100, left: 10,
		width: 250, height: 60
	});
	self.add(text2);
	
	
	var picker = Ti.UI.createPicker({
	  top:200
	});
	
	var data = [];
	data[0]=Ti.UI.createPickerRow({title:'Suma', val:'+'});
	data[1]=Ti.UI.createPickerRow({title:'Resta', val:'-'});
	data[2]=Ti.UI.createPickerRow({title:'Multiplicación', val:'*'});
	data[3]=Ti.UI.createPickerRow({title:'División', val:'/'});
	
	picker.add(data);
	picker.addEventListener("change",function(e){
		label.text=e.row.val;
		
	});



	self.add(picker);

	
	
	var button = Ti.UI.createButton({
	   title: 'Calcula',
	   top: 350,
	   width: 100,
	   height: 50
	});
	button.addEventListener('click',function(e)
	{
	   Ti.API.info("Calculando"+text1.getValue());
	   Ti.API.info("Operación"+label.text);
	   var xhr=Titanium.Network.createHTTPClient();    
		xhr.onerror = function(e){ 
		 Ti.API.error('Bad Sever =>'+e.error);
		};
		 
		xhr.open("POST","http://54.218.108.40:8000/calcula/");//ADD your URL
		//xhr.open("GET","https://raw.github.com/appcelerator/Documentation-Examples/master/HTTPClient/data/json.txt");//ADD your URL
		
		xhr.setRequestHeader("content-type", "application/json");
		var param={ "op1":text1.getValue(),"op2":text2.getValue(),"operacion":label.text };
		 
		Ti.API.info('Params'+JSON.stringify(param));
		xhr.send(JSON.stringify(param));
		//xhr.send();
		 
		xhr.onload = function(){	
		 Ti.API.info('RAW ='+this.responseText);
		 if(this.status == '201'){
		    Ti.API.info('got my response, http status code ' + this.status);
		    if(this.readyState == 4){
		      var response=JSON.parse(this.responseText);
		      
		      Ti.API.info('Response = '+response);
		      alert('El resultado es:'+this.responseText);
		    }else{
		      alert('HTTP Ready State != 4');
		    }           
		 }else{
		    alert('HTTp Error Response Status Code = '+this.status);
		    Ti.API.error("Error =>"+this.response);
		 }              
		};
			   
	   
	});
	self.add(button);
	
	return self;
}

module.exports = FirstView;
