(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.シンボル2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgYAZIAAgxIAxAAIAAAxg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.シンボル2, new cjs.Rectangle(-2.5,-2.5,5,5), null);


(lib.シンボル1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_1
	this.instance = new lib.シンボル2();

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:2.5,y:367.95},52).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.5,-2.5,7.5,373);


// stage content:
(lib.test = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		var fpss = this.fpss;
		var av = this.average;
		var c = 0;
		var t = 0;
		var l = 0;
		var p = 0;
		/*
		createjs.Ticker.addEventListener("tick", function(e) {
			t += e.delta;
			l += e.delta;
			p++;
			av.text = (1000 / (l / p)).toString().slice(0, 8);
			if (++c === 10) {
				c = 0;
				fpss.text = (1000 / (t / 10)).toString().slice(0, 8);
				t = 0;
			}
		});
		
		*/
		
		(function () {
			var count = 0;
			var last = performance.now();
			var l = last;
			var c = 0;
			function loop(now) {
				c++;
				count++;
				if (now - last >= 1000) {
					console.log('render fps:', count * 1000 / (now - last));
					fpss.text = "fps: " + (count * 1000 / (now - last)).toString().slice(0, 6);
					av.text = "avg: " + (1000 / (now - l) * c).toString().slice(0, 6);
					count = 0;
					last = now;
				}
				requestAnimationFrame(loop);
			}
			requestAnimationFrame(loop);
		})();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// レイヤー_7
	this.average = new cjs.Text("ave", "46px 'MS PGothic'", "#FF0000");
	this.average.name = "average";
	this.average.lineHeight = 48;
	this.average.lineWidth = 250;
	this.average.parent = this;
	this.average.setTransform(284,334.5);

	this.fpss = new cjs.Text("fps", "46px 'MS PGothic'", "#FF0000");
	this.fpss.name = "fpss";
	this.fpss.lineHeight = 48;
	this.fpss.lineWidth = 250;
	this.fpss.parent = this;
	this.fpss.setTransform(14.05,334.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.fpss},{t:this.average}]}).wait(1));

	// レイヤー_4
	this.instance = new lib.シンボル1();
	this.instance.setTransform(482.5,186.55);

	this.instance_1 = new lib.シンボル1();
	this.instance_1.setTransform(464,173.05);

	this.instance_2 = new lib.シンボル1();
	this.instance_2.setTransform(278,126.35);

	this.instance_3 = new lib.シンボル1();
	this.instance_3.setTransform(259.5,112.85);

	this.instance_4 = new lib.シンボル1();
	this.instance_4.setTransform(369.5,186.55);

	this.instance_5 = new lib.シンボル1();
	this.instance_5.setTransform(351,173.05);

	this.instance_6 = new lib.シンボル1();
	this.instance_6.setTransform(165,126.35);

	this.instance_7 = new lib.シンボル1();
	this.instance_7.setTransform(146.5,112.85);

	this.instance_8 = new lib.シンボル1();
	this.instance_8.setTransform(346,151.55);

	this.instance_9 = new lib.シンボル1();
	this.instance_9.setTransform(327.5,138.05);

	this.instance_10 = new lib.シンボル1();
	this.instance_10.setTransform(141.5,91.35);

	this.instance_11 = new lib.シンボル1();
	this.instance_11.setTransform(123,77.85);

	this.instance_12 = new lib.シンボル1();
	this.instance_12.setTransform(233,151.55);

	this.instance_13 = new lib.シンボル1();
	this.instance_13.setTransform(214.5,138.05);

	this.instance_14 = new lib.シンボル1();
	this.instance_14.setTransform(28.5,91.35);

	this.instance_15 = new lib.シンボル1();
	this.instance_15.setTransform(10,77.85);

	this.instance_16 = new lib.シンボル1();
	this.instance_16.setTransform(445.5,246.75);

	this.instance_17 = new lib.シンボル1();
	this.instance_17.setTransform(427,233.25);

	this.instance_18 = new lib.シンボル1();
	this.instance_18.setTransform(241,186.55);

	this.instance_19 = new lib.シンボル1();
	this.instance_19.setTransform(222.5,173.05);

	this.instance_20 = new lib.シンボル1();
	this.instance_20.setTransform(332.5,246.75);

	this.instance_21 = new lib.シンボル1();
	this.instance_21.setTransform(314,233.25);

	this.instance_22 = new lib.シンボル1();
	this.instance_22.setTransform(128,186.55);

	this.instance_23 = new lib.シンボル1();
	this.instance_23.setTransform(109.5,173.05);

	this.instance_24 = new lib.シンボル1();
	this.instance_24.setTransform(309,211.75);

	this.instance_25 = new lib.シンボル1();
	this.instance_25.setTransform(290.5,198.25);

	this.instance_26 = new lib.シンボル1();
	this.instance_26.setTransform(104.5,151.55);

	this.instance_27 = new lib.シンボル1();
	this.instance_27.setTransform(86,138.05);

	this.instance_28 = new lib.シンボル1();
	this.instance_28.setTransform(196,211.75);

	this.instance_29 = new lib.シンボル1();
	this.instance_29.setTransform(177.5,198.25);

	this.instance_30 = new lib.シンボル1();
	this.instance_30.setTransform(2.5,190.05,1,1,0,0,180);

	this.instance_31 = new lib.シンボル1();
	this.instance_31.setTransform(21,176.55,1,1,0,0,180);

	this.instance_32 = new lib.シンボル1();
	this.instance_32.setTransform(430.5,133.05);

	this.instance_33 = new lib.シンボル1();
	this.instance_33.setTransform(412,119.55);

	this.instance_34 = new lib.シンボル1();
	this.instance_34.setTransform(383,86.35);

	this.instance_35 = new lib.シンボル1();
	this.instance_35.setTransform(364.5,72.85);

	this.instance_36 = new lib.シンボル1();
	this.instance_36.setTransform(474.5,146.55);

	this.instance_37 = new lib.シンボル1();
	this.instance_37.setTransform(456,133.05);

	this.instance_38 = new lib.シンボル1();
	this.instance_38.setTransform(270,86.35);

	this.instance_39 = new lib.シンボル1();
	this.instance_39.setTransform(251.5,72.85);

	this.instance_40 = new lib.シンボル1();
	this.instance_40.setTransform(451,111.55);

	this.instance_41 = new lib.シンボル1();
	this.instance_41.setTransform(432.5,98.05);

	this.instance_42 = new lib.シンボル1();
	this.instance_42.setTransform(246.5,51.35);

	this.instance_43 = new lib.シンボル1();
	this.instance_43.setTransform(228,37.85);

	this.instance_44 = new lib.シンボル1();
	this.instance_44.setTransform(338,111.55);

	this.instance_45 = new lib.シンボル1();
	this.instance_45.setTransform(319.5,98.05);

	this.instance_46 = new lib.シンボル1();
	this.instance_46.setTransform(133.5,51.35);

	this.instance_47 = new lib.シンボル1();
	this.instance_47.setTransform(115,37.85);

	this.instance_48 = new lib.シンボル1();
	this.instance_48.setTransform(393.5,193.25);

	this.instance_49 = new lib.シンボル1();
	this.instance_49.setTransform(375,179.75);

	this.instance_50 = new lib.シンボル1();
	this.instance_50.setTransform(346,146.55);

	this.instance_51 = new lib.シンボル1();
	this.instance_51.setTransform(327.5,133.05);

	this.instance_52 = new lib.シンボル1();
	this.instance_52.setTransform(437.5,206.75);

	this.instance_53 = new lib.シンボル1();
	this.instance_53.setTransform(419,193.25);

	this.instance_54 = new lib.シンボル1();
	this.instance_54.setTransform(233,146.55);

	this.instance_55 = new lib.シンボル1();
	this.instance_55.setTransform(214.5,133.05);

	this.instance_56 = new lib.シンボル1();
	this.instance_56.setTransform(414,171.75);

	this.instance_57 = new lib.シンボル1();
	this.instance_57.setTransform(395.5,158.25);

	this.instance_58 = new lib.シンボル1();
	this.instance_58.setTransform(209.5,111.55);

	this.instance_59 = new lib.シンボル1();
	this.instance_59.setTransform(191,98.05);

	this.instance_60 = new lib.シンボル1();
	this.instance_60.setTransform(301,171.75);

	this.instance_61 = new lib.シンボル1();
	this.instance_61.setTransform(282.5,158.25);

	this.instance_62 = new lib.シンボル1();
	this.instance_62.setTransform(96.5,111.55);

	this.instance_63 = new lib.シンボル1();
	this.instance_63.setTransform(78,98.05);

	this.instance_64 = new lib.シンボル1();
	this.instance_64.setTransform(387,200.05);

	this.instance_65 = new lib.シンボル1();
	this.instance_65.setTransform(368.5,186.55);

	this.instance_66 = new lib.シンボル1();
	this.instance_66.setTransform(182.5,139.85);

	this.instance_67 = new lib.シンボル1();
	this.instance_67.setTransform(164,126.35);

	this.instance_68 = new lib.シンボル1();
	this.instance_68.setTransform(274,200.05);

	this.instance_69 = new lib.シンボル1();
	this.instance_69.setTransform(255.5,186.55);

	this.instance_70 = new lib.シンボル1();
	this.instance_70.setTransform(69.5,139.85);

	this.instance_71 = new lib.シンボル1();
	this.instance_71.setTransform(51,126.35);

	this.instance_72 = new lib.シンボル1();
	this.instance_72.setTransform(250.5,165.05);

	this.instance_73 = new lib.シンボル1();
	this.instance_73.setTransform(232,151.55);

	this.instance_74 = new lib.シンボル1();
	this.instance_74.setTransform(46,104.85);

	this.instance_75 = new lib.シンボル1();
	this.instance_75.setTransform(27.5,91.35);

	this.instance_76 = new lib.シンボル1();
	this.instance_76.setTransform(137.5,165.05);

	this.instance_77 = new lib.シンボル1();
	this.instance_77.setTransform(119,151.55);

	this.instance_78 = new lib.シンボル1();
	this.instance_78.setTransform(61,143.35,1,1,0,0,180);

	this.instance_79 = new lib.シンボル1();
	this.instance_79.setTransform(79.5,129.85,1,1,0,0,180);

	this.instance_80 = new lib.シンボル1();
	this.instance_80.setTransform(350,260.25);

	this.instance_81 = new lib.シンボル1();
	this.instance_81.setTransform(331.5,246.75);

	this.instance_82 = new lib.シンボル1();
	this.instance_82.setTransform(145.5,200.05);

	this.instance_83 = new lib.シンボル1();
	this.instance_83.setTransform(127,186.55);

	this.instance_84 = new lib.シンボル1();
	this.instance_84.setTransform(237,260.25);

	this.instance_85 = new lib.シンボル1();
	this.instance_85.setTransform(218.5,246.75);

	this.instance_86 = new lib.シンボル1();
	this.instance_86.setTransform(32.5,200.05);

	this.instance_87 = new lib.シンボル1();
	this.instance_87.setTransform(14,186.55);

	this.instance_88 = new lib.シンボル1();
	this.instance_88.setTransform(213.5,225.25);

	this.instance_89 = new lib.シンボル1();
	this.instance_89.setTransform(195,211.75);

	this.instance_90 = new lib.シンボル1();
	this.instance_90.setTransform(9,165.05);

	this.instance_91 = new lib.シンボル1();
	this.instance_91.setTransform(3.5,190.05,1,1,0,0,180);

	this.instance_92 = new lib.シンボル1();
	this.instance_92.setTransform(100.5,225.25);

	this.instance_93 = new lib.シンボル1();
	this.instance_93.setTransform(82,211.75);

	this.instance_94 = new lib.シンボル1();
	this.instance_94.setTransform(98,203.55,1,1,0,0,180);

	this.instance_95 = new lib.シンボル1();
	this.instance_95.setTransform(116.5,190.05,1,1,0,0,180);

	this.instance_96 = new lib.シンボル1();
	this.instance_96.setTransform(492,160.05);

	this.instance_97 = new lib.シンボル1();
	this.instance_97.setTransform(473.5,146.55);

	this.instance_98 = new lib.シンボル1();
	this.instance_98.setTransform(287.5,99.85);

	this.instance_99 = new lib.シンボル1();
	this.instance_99.setTransform(269,86.35);

	this.instance_100 = new lib.シンボル1();
	this.instance_100.setTransform(379,160.05);

	this.instance_101 = new lib.シンボル1();
	this.instance_101.setTransform(360.5,146.55);

	this.instance_102 = new lib.シンボル1();
	this.instance_102.setTransform(174.5,99.85);

	this.instance_103 = new lib.シンボル1();
	this.instance_103.setTransform(156,86.35);

	this.instance_104 = new lib.シンボル1();
	this.instance_104.setTransform(355.5,125.05);

	this.instance_105 = new lib.シンボル1();
	this.instance_105.setTransform(337,111.55);

	this.instance_106 = new lib.シンボル1();
	this.instance_106.setTransform(151,64.85);

	this.instance_107 = new lib.シンボル1();
	this.instance_107.setTransform(132.5,51.35);

	this.instance_108 = new lib.シンボル1();
	this.instance_108.setTransform(242.5,125.05);

	this.instance_109 = new lib.シンボル1();
	this.instance_109.setTransform(224,111.55);

	this.instance_110 = new lib.シンボル1();
	this.instance_110.setTransform(38,64.85);

	this.instance_111 = new lib.シンボル1();
	this.instance_111.setTransform(19.5,51.35);

	this.instance_112 = new lib.シンボル1();
	this.instance_112.setTransform(455,220.25);

	this.instance_113 = new lib.シンボル1();
	this.instance_113.setTransform(436.5,206.75);

	this.instance_114 = new lib.シンボル1();
	this.instance_114.setTransform(250.5,160.05);

	this.instance_115 = new lib.シンボル1();
	this.instance_115.setTransform(232,146.55);

	this.instance_116 = new lib.シンボル1();
	this.instance_116.setTransform(342,220.25);

	this.instance_117 = new lib.シンボル1();
	this.instance_117.setTransform(323.5,206.75);

	this.instance_118 = new lib.シンボル1();
	this.instance_118.setTransform(137.5,160.05);

	this.instance_119 = new lib.シンボル1();
	this.instance_119.setTransform(119,146.55);

	this.instance_120 = new lib.シンボル1();
	this.instance_120.setTransform(318.5,185.25);

	this.instance_121 = new lib.シンボル1();
	this.instance_121.setTransform(300,171.75);

	this.instance_122 = new lib.シンボル1();
	this.instance_122.setTransform(114,125.05);

	this.instance_123 = new lib.シンボル1();
	this.instance_123.setTransform(95.5,111.55);

	this.instance_124 = new lib.シンボル1();
	this.instance_124.setTransform(205.5,185.25);

	this.instance_125 = new lib.シンボル1();
	this.instance_125.setTransform(187,171.75);

	this.instance_126 = new lib.シンボル1();
	this.instance_126.setTransform(1,125.05);

	this.instance_127 = new lib.シンボル1();
	this.instance_127.setTransform(11.5,150.05,1,1,0,0,180);

	this.instance_128 = new lib.シンボル1();
	this.instance_128.setTransform(413.5,150.05);

	this.instance_129 = new lib.シンボル1();
	this.instance_129.setTransform(395,136.55);

	this.instance_130 = new lib.シンボル1();
	this.instance_130.setTransform(366,103.35);

	this.instance_131 = new lib.シンボル1();
	this.instance_131.setTransform(347.5,89.85);

	this.instance_132 = new lib.シンボル1();
	this.instance_132.setTransform(457.5,163.55);

	this.instance_133 = new lib.シンボル1();
	this.instance_133.setTransform(439,150.05);

	this.instance_134 = new lib.シンボル1();
	this.instance_134.setTransform(253,103.35);

	this.instance_135 = new lib.シンボル1();
	this.instance_135.setTransform(234.5,89.85);

	this.instance_136 = new lib.シンボル1();
	this.instance_136.setTransform(434,128.55);

	this.instance_137 = new lib.シンボル1();
	this.instance_137.setTransform(415.5,115.05);

	this.instance_138 = new lib.シンボル1();
	this.instance_138.setTransform(229.5,68.35);

	this.instance_139 = new lib.シンボル1();
	this.instance_139.setTransform(211,54.85);

	this.instance_140 = new lib.シンボル1();
	this.instance_140.setTransform(321,128.55);

	this.instance_141 = new lib.シンボル1();
	this.instance_141.setTransform(302.5,115.05);

	this.instance_142 = new lib.シンボル1();
	this.instance_142.setTransform(116.5,68.35);

	this.instance_143 = new lib.シンボル1();
	this.instance_143.setTransform(98,54.85);

	this.instance_144 = new lib.シンボル1();
	this.instance_144.setTransform(376.5,210.25);

	this.instance_145 = new lib.シンボル1();
	this.instance_145.setTransform(515,210.25);

	this.instance_146 = new lib.シンボル1();
	this.instance_146.setTransform(329,163.55);

	this.instance_147 = new lib.シンボル1();
	this.instance_147.setTransform(310.5,150.05);

	this.instance_148 = new lib.シンボル1();
	this.instance_148.setTransform(420.5,223.75);

	this.instance_149 = new lib.シンボル1();
	this.instance_149.setTransform(402,210.25);

	this.instance_150 = new lib.シンボル1();
	this.instance_150.setTransform(216,163.55);

	this.instance_151 = new lib.シンボル1();
	this.instance_151.setTransform(197.5,150.05);

	this.instance_152 = new lib.シンボル1();
	this.instance_152.setTransform(397,188.75);

	this.instance_153 = new lib.シンボル1();
	this.instance_153.setTransform(378.5,175.25);

	this.instance_154 = new lib.シンボル1();
	this.instance_154.setTransform(192.5,128.55);

	this.instance_155 = new lib.シンボル1();
	this.instance_155.setTransform(174,115.05);

	this.instance_156 = new lib.シンボル1();
	this.instance_156.setTransform(284,188.75);

	this.instance_157 = new lib.シンボル1();
	this.instance_157.setTransform(265.5,175.25);

	this.instance_158 = new lib.シンボル1();
	this.instance_158.setTransform(79.5,128.55);

	this.instance_159 = new lib.シンボル1();
	this.instance_159.setTransform(61,115.05);

	this.instance_160 = new lib.シンボル1();
	this.instance_160.setTransform(518.5,110.05);

	this.instance_161 = new lib.シンボル1();
	this.instance_161.setTransform(500,96.55);

	this.instance_162 = new lib.シンボル1();
	this.instance_162.setTransform(471,63.35);

	this.instance_163 = new lib.シンボル1();
	this.instance_163.setTransform(452.5,49.85);

	this.instance_164 = new lib.シンボル1();
	this.instance_164.setTransform(405.5,110.05);

	this.instance_165 = new lib.シンボル1();
	this.instance_165.setTransform(387,96.55);

	this.instance_166 = new lib.シンボル1();
	this.instance_166.setTransform(358,63.35);

	this.instance_167 = new lib.シンボル1();
	this.instance_167.setTransform(339.5,49.85);

	this.instance_168 = new lib.シンボル1();
	this.instance_168.setTransform(382,75.05);

	this.instance_169 = new lib.シンボル1();
	this.instance_169.setTransform(363.5,61.55);

	this.instance_170 = new lib.シンボル1();
	this.instance_170.setTransform(334.5,28.35);

	this.instance_171 = new lib.シンボル1();
	this.instance_171.setTransform(316,14.85);

	this.instance_172 = new lib.シンボル1();
	this.instance_172.setTransform(426,88.55);

	this.instance_173 = new lib.シンボル1();
	this.instance_173.setTransform(407.5,75.05);

	this.instance_174 = new lib.シンボル1();
	this.instance_174.setTransform(221.5,28.35);

	this.instance_175 = new lib.シンボル1();
	this.instance_175.setTransform(203,14.85);

	this.instance_176 = new lib.シンボル1();
	this.instance_176.setTransform(481.5,170.25);

	this.instance_177 = new lib.シンボル1();
	this.instance_177.setTransform(463,156.75);

	this.instance_178 = new lib.シンボル1();
	this.instance_178.setTransform(434,123.55);

	this.instance_179 = new lib.シンボル1();
	this.instance_179.setTransform(415.5,110.05);

	this.instance_180 = new lib.シンボル1();
	this.instance_180.setTransform(368.5,170.25);

	this.instance_181 = new lib.シンボル1();
	this.instance_181.setTransform(507,170.25);

	this.instance_182 = new lib.シンボル1();
	this.instance_182.setTransform(321,123.55);

	this.instance_183 = new lib.シンボル1();
	this.instance_183.setTransform(302.5,110.05);

	this.instance_184 = new lib.シンボル1();
	this.instance_184.setTransform(502,148.75);

	this.instance_185 = new lib.シンボル1();
	this.instance_185.setTransform(483.5,135.25);

	this.instance_186 = new lib.シンボル1();
	this.instance_186.setTransform(297.5,88.55);

	this.instance_187 = new lib.シンボル1();
	this.instance_187.setTransform(279,75.05);

	this.instance_188 = new lib.シンボル1();
	this.instance_188.setTransform(389,148.75);

	this.instance_189 = new lib.シンボル1();
	this.instance_189.setTransform(370.5,135.25);

	this.instance_190 = new lib.シンボル1();
	this.instance_190.setTransform(184.5,88.55);

	this.instance_191 = new lib.シンボル1();
	this.instance_191.setTransform(166,75.05);

	this.instance_192 = new lib.シンボル1();
	this.instance_192.setTransform(475,177.05);

	this.instance_193 = new lib.シンボル1();
	this.instance_193.setTransform(456.5,163.55);

	this.instance_194 = new lib.シンボル1();
	this.instance_194.setTransform(270.5,116.85);

	this.instance_195 = new lib.シンボル1();
	this.instance_195.setTransform(252,103.35);

	this.instance_196 = new lib.シンボル1();
	this.instance_196.setTransform(362,177.05);

	this.instance_197 = new lib.シンボル1();
	this.instance_197.setTransform(343.5,163.55);

	this.instance_198 = new lib.シンボル1();
	this.instance_198.setTransform(157.5,116.85);

	this.instance_199 = new lib.シンボル1();
	this.instance_199.setTransform(139,103.35);

	this.instance_200 = new lib.シンボル1();
	this.instance_200.setTransform(338.5,142.05);

	this.instance_201 = new lib.シンボル1();
	this.instance_201.setTransform(320,128.55);

	this.instance_202 = new lib.シンボル1();
	this.instance_202.setTransform(134,81.85);

	this.instance_203 = new lib.シンボル1();
	this.instance_203.setTransform(115.5,68.35);

	this.instance_204 = new lib.シンボル1();
	this.instance_204.setTransform(225.5,142.05);

	this.instance_205 = new lib.シンボル1();
	this.instance_205.setTransform(207,128.55);

	this.instance_206 = new lib.シンボル1();
	this.instance_206.setTransform(21,81.85);

	this.instance_207 = new lib.シンボル1();
	this.instance_207.setTransform(2.5,68.35);

	this.instance_208 = new lib.シンボル1();
	this.instance_208.setTransform(438,237.25);

	this.instance_209 = new lib.シンボル1();
	this.instance_209.setTransform(419.5,223.75);

	this.instance_210 = new lib.シンボル1();
	this.instance_210.setTransform(233.5,177.05);

	this.instance_211 = new lib.シンボル1();
	this.instance_211.setTransform(215,163.55);

	this.instance_212 = new lib.シンボル1();
	this.instance_212.setTransform(325,237.25);

	this.instance_213 = new lib.シンボル1();
	this.instance_213.setTransform(306.5,223.75);

	this.instance_214 = new lib.シンボル1();
	this.instance_214.setTransform(120.5,177.05);

	this.instance_215 = new lib.シンボル1();
	this.instance_215.setTransform(102,163.55);

	this.instance_216 = new lib.シンボル1();
	this.instance_216.setTransform(301.5,202.25);

	this.instance_217 = new lib.シンボル1();
	this.instance_217.setTransform(283,188.75);

	this.instance_218 = new lib.シンボル1();
	this.instance_218.setTransform(97,142.05);

	this.instance_219 = new lib.シンボル1();
	this.instance_219.setTransform(78.5,128.55);

	this.instance_220 = new lib.シンボル1();
	this.instance_220.setTransform(188.5,202.25);

	this.instance_221 = new lib.シンボル1();
	this.instance_221.setTransform(170,188.75);

	this.instance_222 = new lib.シンボル1();
	this.instance_222.setTransform(10,180.55,1,1,0,0,180);

	this.instance_223 = new lib.シンボル1();
	this.instance_223.setTransform(28.5,167.05,1,1,0,0,180);

	this.instance_224 = new lib.シンボル1();
	this.instance_224.setTransform(423,123.55);

	this.instance_225 = new lib.シンボル1();
	this.instance_225.setTransform(404.5,110.05);

	this.instance_226 = new lib.シンボル1();
	this.instance_226.setTransform(375.5,76.85);

	this.instance_227 = new lib.シンボル1();
	this.instance_227.setTransform(357,63.35);

	this.instance_228 = new lib.シンボル1();
	this.instance_228.setTransform(467,137.05);

	this.instance_229 = new lib.シンボル1();
	this.instance_229.setTransform(448.5,123.55);

	this.instance_230 = new lib.シンボル1();
	this.instance_230.setTransform(262.5,76.85);

	this.instance_231 = new lib.シンボル1();
	this.instance_231.setTransform(244,63.35);

	this.instance_232 = new lib.シンボル1();
	this.instance_232.setTransform(443.5,102.05);

	this.instance_233 = new lib.シンボル1();
	this.instance_233.setTransform(425,88.55);

	this.instance_234 = new lib.シンボル1();
	this.instance_234.setTransform(239,41.85);

	this.instance_235 = new lib.シンボル1();
	this.instance_235.setTransform(220.5,28.35);

	this.instance_236 = new lib.シンボル1();
	this.instance_236.setTransform(330.5,102.05);

	this.instance_237 = new lib.シンボル1();
	this.instance_237.setTransform(312,88.55);

	this.instance_238 = new lib.シンボル1();
	this.instance_238.setTransform(126,41.85);

	this.instance_239 = new lib.シンボル1();
	this.instance_239.setTransform(107.5,28.35);

	this.instance_240 = new lib.シンボル1();
	this.instance_240.setTransform(386,183.75);

	this.instance_241 = new lib.シンボル1();
	this.instance_241.setTransform(367.5,170.25);

	this.instance_242 = new lib.シンボル1();
	this.instance_242.setTransform(338.5,137.05);

	this.instance_243 = new lib.シンボル1();
	this.instance_243.setTransform(320,123.55);

	this.instance_244 = new lib.シンボル1();
	this.instance_244.setTransform(430,197.25);

	this.instance_245 = new lib.シンボル1();
	this.instance_245.setTransform(411.5,183.75);

	this.instance_246 = new lib.シンボル1();
	this.instance_246.setTransform(225.5,137.05);

	this.instance_247 = new lib.シンボル1();
	this.instance_247.setTransform(207,123.55);

	this.instance_248 = new lib.シンボル1();
	this.instance_248.setTransform(406.5,162.25);

	this.instance_249 = new lib.シンボル1();
	this.instance_249.setTransform(388,148.75);

	this.instance_250 = new lib.シンボル1();
	this.instance_250.setTransform(202,102.05);

	this.instance_251 = new lib.シンボル1();
	this.instance_251.setTransform(183.5,88.55);

	this.instance_252 = new lib.シンボル1();
	this.instance_252.setTransform(293.5,162.25);

	this.instance_253 = new lib.シンボル1();
	this.instance_253.setTransform(275,148.75);

	this.instance_254 = new lib.シンボル1();
	this.instance_254.setTransform(89,102.05);

	this.instance_255 = new lib.シンボル1();
	this.instance_255.setTransform(70.5,88.55);

	this.instance_256 = new lib.シンボル1();
	this.instance_256.setTransform(412.5,200.05);

	this.instance_257 = new lib.シンボル1();
	this.instance_257.setTransform(394,186.55);

	this.instance_258 = new lib.シンボル1();
	this.instance_258.setTransform(208,139.85);

	this.instance_259 = new lib.シンボル1();
	this.instance_259.setTransform(189.5,126.35);

	this.instance_260 = new lib.シンボル1();
	this.instance_260.setTransform(299.5,200.05);

	this.instance_261 = new lib.シンボル1();
	this.instance_261.setTransform(281,186.55);

	this.instance_262 = new lib.シンボル1();
	this.instance_262.setTransform(95,139.85);

	this.instance_263 = new lib.シンボル1();
	this.instance_263.setTransform(76.5,126.35);

	this.instance_264 = new lib.シンボル1();
	this.instance_264.setTransform(276,165.05);

	this.instance_265 = new lib.シンボル1();
	this.instance_265.setTransform(257.5,151.55);

	this.instance_266 = new lib.シンボル1();
	this.instance_266.setTransform(71.5,104.85);

	this.instance_267 = new lib.シンボル1();
	this.instance_267.setTransform(53,91.35);

	this.instance_268 = new lib.シンボル1();
	this.instance_268.setTransform(163,165.05);

	this.instance_269 = new lib.シンボル1();
	this.instance_269.setTransform(144.5,151.55);

	this.instance_270 = new lib.シンボル1();
	this.instance_270.setTransform(35.5,143.35,1,1,0,0,180);

	this.instance_271 = new lib.シンボル1();
	this.instance_271.setTransform(54,129.85,1,1,0,0,180);

	this.instance_272 = new lib.シンボル1();
	this.instance_272.setTransform(375.5,260.25);

	this.instance_273 = new lib.シンボル1();
	this.instance_273.setTransform(357,246.75);

	this.instance_274 = new lib.シンボル1();
	this.instance_274.setTransform(171,200.05);

	this.instance_275 = new lib.シンボル1();
	this.instance_275.setTransform(152.5,186.55);

	this.instance_276 = new lib.シンボル1();
	this.instance_276.setTransform(262.5,260.25);

	this.instance_277 = new lib.シンボル1();
	this.instance_277.setTransform(244,246.75);

	this.instance_278 = new lib.シンボル1();
	this.instance_278.setTransform(58,200.05);

	this.instance_279 = new lib.シンボル1();
	this.instance_279.setTransform(39.5,186.55);

	this.instance_280 = new lib.シンボル1();
	this.instance_280.setTransform(239,225.25);

	this.instance_281 = new lib.シンボル1();
	this.instance_281.setTransform(220.5,211.75);

	this.instance_282 = new lib.シンボル1();
	this.instance_282.setTransform(34.5,165.05);

	this.instance_283 = new lib.シンボル1();
	this.instance_283.setTransform(16,151.55);

	this.instance_284 = new lib.シンボル1();
	this.instance_284.setTransform(126,225.25);

	this.instance_285 = new lib.シンボル1();
	this.instance_285.setTransform(107.5,211.75);

	this.instance_286 = new lib.シンボル1();
	this.instance_286.setTransform(72.5,203.55,1,1,0,0,180);

	this.instance_287 = new lib.シンボル1();
	this.instance_287.setTransform(91,190.05,1,1,0,0,180);

	this.instance_288 = new lib.シンボル1();
	this.instance_288.setTransform(360.5,146.55);

	this.instance_289 = new lib.シンボル1();
	this.instance_289.setTransform(499,146.55);

	this.instance_290 = new lib.シンボル1();
	this.instance_290.setTransform(313,99.85);

	this.instance_291 = new lib.シンボル1();
	this.instance_291.setTransform(294.5,86.35);

	this.instance_292 = new lib.シンボル1();
	this.instance_292.setTransform(404.5,160.05);

	this.instance_293 = new lib.シンボル1();
	this.instance_293.setTransform(386,146.55);

	this.instance_294 = new lib.シンボル1();
	this.instance_294.setTransform(200,99.85);

	this.instance_295 = new lib.シンボル1();
	this.instance_295.setTransform(181.5,86.35);

	this.instance_296 = new lib.シンボル1();
	this.instance_296.setTransform(381,125.05);

	this.instance_297 = new lib.シンボル1();
	this.instance_297.setTransform(362.5,111.55);

	this.instance_298 = new lib.シンボル1();
	this.instance_298.setTransform(176.5,64.85);

	this.instance_299 = new lib.シンボル1();
	this.instance_299.setTransform(158,51.35);

	this.instance_300 = new lib.シンボル1();
	this.instance_300.setTransform(268,125.05);

	this.instance_301 = new lib.シンボル1();
	this.instance_301.setTransform(249.5,111.55);

	this.instance_302 = new lib.シンボル1();
	this.instance_302.setTransform(63.5,64.85);

	this.instance_303 = new lib.シンボル1();
	this.instance_303.setTransform(45,51.35);

	this.instance_304 = new lib.シンボル1();
	this.instance_304.setTransform(480.5,220.25);

	this.instance_305 = new lib.シンボル1();
	this.instance_305.setTransform(462,206.75);

	this.instance_306 = new lib.シンボル1();
	this.instance_306.setTransform(276,160.05);

	this.instance_307 = new lib.シンボル1();
	this.instance_307.setTransform(257.5,146.55);

	this.instance_308 = new lib.シンボル1();
	this.instance_308.setTransform(367.5,220.25);

	this.instance_309 = new lib.シンボル1();
	this.instance_309.setTransform(349,206.75);

	this.instance_310 = new lib.シンボル1();
	this.instance_310.setTransform(163,160.05);

	this.instance_311 = new lib.シンボル1();
	this.instance_311.setTransform(144.5,146.55);

	this.instance_312 = new lib.シンボル1();
	this.instance_312.setTransform(344,185.25);

	this.instance_313 = new lib.シンボル1();
	this.instance_313.setTransform(325.5,171.75);

	this.instance_314 = new lib.シンボル1();
	this.instance_314.setTransform(139.5,125.05);

	this.instance_315 = new lib.シンボル1();
	this.instance_315.setTransform(121,111.55);

	this.instance_316 = new lib.シンボル1();
	this.instance_316.setTransform(231,185.25);

	this.instance_317 = new lib.シンボル1();
	this.instance_317.setTransform(212.5,171.75);

	this.instance_318 = new lib.シンボル1();
	this.instance_318.setTransform(26.5,125.05);

	this.instance_319 = new lib.シンボル1();
	this.instance_319.setTransform(8,111.55);

	this.instance_320 = new lib.シンボル1();
	this.instance_320.setTransform(317,213.55);

	this.instance_321 = new lib.シンボル1();
	this.instance_321.setTransform(298.5,200.05);

	this.instance_322 = new lib.シンボル1();
	this.instance_322.setTransform(112.5,153.35);

	this.instance_323 = new lib.シンボル1();
	this.instance_323.setTransform(94,139.85);

	this.instance_324 = new lib.シンボル1();
	this.instance_324.setTransform(204,213.55);

	this.instance_325 = new lib.シンボル1();
	this.instance_325.setTransform(185.5,200.05);

	this.instance_326 = new lib.シンボル1();
	this.instance_326.setTransform(-0.5,153.35);

	this.instance_327 = new lib.シンボル1();
	this.instance_327.setTransform(13,178.35,1,1,0,0,180);

	this.instance_328 = new lib.シンボル1();
	this.instance_328.setTransform(180.5,178.55);

	this.instance_329 = new lib.シンボル1();
	this.instance_329.setTransform(162,165.05);

	this.instance_330 = new lib.シンボル1();
	this.instance_330.setTransform(18,156.85,1,1,0,0,180);

	this.instance_331 = new lib.シンボル1();
	this.instance_331.setTransform(36.5,143.35,1,1,0,0,180);

	this.instance_332 = new lib.シンボル1();
	this.instance_332.setTransform(67.5,178.55);

	this.instance_333 = new lib.シンボル1();
	this.instance_333.setTransform(49,165.05);

	this.instance_334 = new lib.シンボル1();
	this.instance_334.setTransform(131,156.85,1,1,0,0,180);

	this.instance_335 = new lib.シンボル1();
	this.instance_335.setTransform(149.5,143.35,1,1,0,0,180);

	this.instance_336 = new lib.シンボル1();
	this.instance_336.setTransform(280,273.75);

	this.instance_337 = new lib.シンボル1();
	this.instance_337.setTransform(261.5,260.25);

	this.instance_338 = new lib.シンボル1();
	this.instance_338.setTransform(75.5,213.55);

	this.instance_339 = new lib.シンボル1();
	this.instance_339.setTransform(57,200.05);

	this.instance_340 = new lib.シンボル1();
	this.instance_340.setTransform(167,273.75);

	this.instance_341 = new lib.シンボル1();
	this.instance_341.setTransform(148.5,260.25);

	this.instance_342 = new lib.シンボル1();
	this.instance_342.setTransform(31.5,252.05,1,1,0,0,180);

	this.instance_343 = new lib.シンボル1();
	this.instance_343.setTransform(50,238.55,1,1,0,0,180);

	this.instance_344 = new lib.シンボル1();
	this.instance_344.setTransform(143.5,238.75);

	this.instance_345 = new lib.シンボル1();
	this.instance_345.setTransform(125,225.25);

	this.instance_346 = new lib.シンボル1();
	this.instance_346.setTransform(55,217.05,1,1,0,0,180);

	this.instance_347 = new lib.シンボル1();
	this.instance_347.setTransform(73.5,203.55,1,1,0,0,180);

	this.instance_348 = new lib.シンボル1();
	this.instance_348.setTransform(30.5,238.75);

	this.instance_349 = new lib.シンボル1();
	this.instance_349.setTransform(12,225.25);

	this.instance_350 = new lib.シンボル1();
	this.instance_350.setTransform(168,217.05,1,1,0,0,180);

	this.instance_351 = new lib.シンボル1();
	this.instance_351.setTransform(186.5,203.55,1,1,0,0,180);

	this.instance_352 = new lib.シンボル1();
	this.instance_352.setTransform(422,173.55);

	this.instance_353 = new lib.シンボル1();
	this.instance_353.setTransform(403.5,160.05);

	this.instance_354 = new lib.シンボル1();
	this.instance_354.setTransform(217.5,113.35);

	this.instance_355 = new lib.シンボル1();
	this.instance_355.setTransform(199,99.85);

	this.instance_356 = new lib.シンボル1();
	this.instance_356.setTransform(309,173.55);

	this.instance_357 = new lib.シンボル1();
	this.instance_357.setTransform(290.5,160.05);

	this.instance_358 = new lib.シンボル1();
	this.instance_358.setTransform(104.5,113.35);

	this.instance_359 = new lib.シンボル1();
	this.instance_359.setTransform(86,99.85);

	this.instance_360 = new lib.シンボル1();
	this.instance_360.setTransform(285.5,138.55);

	this.instance_361 = new lib.シンボル1();
	this.instance_361.setTransform(267,125.05);

	this.instance_362 = new lib.シンボル1();
	this.instance_362.setTransform(81,78.35);

	this.instance_363 = new lib.シンボル1();
	this.instance_363.setTransform(62.5,64.85);

	this.instance_364 = new lib.シンボル1();
	this.instance_364.setTransform(172.5,138.55);

	this.instance_365 = new lib.シンボル1();
	this.instance_365.setTransform(154,125.05);

	this.instance_366 = new lib.シンボル1();
	this.instance_366.setTransform(26,116.85,1,1,0,0,180);

	this.instance_367 = new lib.シンボル1();
	this.instance_367.setTransform(44.5,103.35,1,1,0,0,180);

	this.instance_368 = new lib.シンボル1();
	this.instance_368.setTransform(385,233.75);

	this.instance_369 = new lib.シンボル1();
	this.instance_369.setTransform(366.5,220.25);

	this.instance_370 = new lib.シンボル1();
	this.instance_370.setTransform(180.5,173.55);

	this.instance_371 = new lib.シンボル1();
	this.instance_371.setTransform(162,160.05);

	this.instance_372 = new lib.シンボル1();
	this.instance_372.setTransform(272,233.75);

	this.instance_373 = new lib.シンボル1();
	this.instance_373.setTransform(253.5,220.25);

	this.instance_374 = new lib.シンボル1();
	this.instance_374.setTransform(67.5,173.55);

	this.instance_375 = new lib.シンボル1();
	this.instance_375.setTransform(49,160.05);

	this.instance_376 = new lib.シンボル1();
	this.instance_376.setTransform(248.5,198.75);

	this.instance_377 = new lib.シンボル1();
	this.instance_377.setTransform(230,185.25);

	this.instance_378 = new lib.シンボル1();
	this.instance_378.setTransform(44,138.55);

	this.instance_379 = new lib.シンボル1();
	this.instance_379.setTransform(25.5,125.05);

	this.instance_380 = new lib.シンボル1();
	this.instance_380.setTransform(135.5,198.75);

	this.instance_381 = new lib.シンボル1();
	this.instance_381.setTransform(117,185.25);

	this.instance_382 = new lib.シンボル1();
	this.instance_382.setTransform(63,177.05,1,1,0,0,180);

	this.instance_383 = new lib.シンボル1();
	this.instance_383.setTransform(81.5,163.55,1,1,0,0,180);

	this.instance_384 = new lib.シンボル1();
	this.instance_384.setTransform(500.5,177.05);

	this.instance_385 = new lib.シンボル1();
	this.instance_385.setTransform(482,163.55);

	this.instance_386 = new lib.シンボル1();
	this.instance_386.setTransform(296,116.85);

	this.instance_387 = new lib.シンボル1();
	this.instance_387.setTransform(277.5,103.35);

	this.instance_388 = new lib.シンボル1();
	this.instance_388.setTransform(387.5,177.05);

	this.instance_389 = new lib.シンボル1();
	this.instance_389.setTransform(369,163.55);

	this.instance_390 = new lib.シンボル1();
	this.instance_390.setTransform(183,116.85);

	this.instance_391 = new lib.シンボル1();
	this.instance_391.setTransform(164.5,103.35);

	this.instance_392 = new lib.シンボル1();
	this.instance_392.setTransform(364,142.05);

	this.instance_393 = new lib.シンボル1();
	this.instance_393.setTransform(345.5,128.55);

	this.instance_394 = new lib.シンボル1();
	this.instance_394.setTransform(159.5,81.85);

	this.instance_395 = new lib.シンボル1();
	this.instance_395.setTransform(141,68.35);

	this.instance_396 = new lib.シンボル1();
	this.instance_396.setTransform(251,142.05);

	this.instance_397 = new lib.シンボル1();
	this.instance_397.setTransform(232.5,128.55);

	this.instance_398 = new lib.シンボル1();
	this.instance_398.setTransform(46.5,81.85);

	this.instance_399 = new lib.シンボル1();
	this.instance_399.setTransform(28,68.35);

	this.instance_400 = new lib.シンボル1();
	this.instance_400.setTransform(463.5,237.25);

	this.instance_401 = new lib.シンボル1();
	this.instance_401.setTransform(445,223.75);

	this.instance_402 = new lib.シンボル1();
	this.instance_402.setTransform(259,177.05);

	this.instance_403 = new lib.シンボル1();
	this.instance_403.setTransform(240.5,163.55);

	this.instance_404 = new lib.シンボル1();
	this.instance_404.setTransform(350.5,237.25);

	this.instance_405 = new lib.シンボル1();
	this.instance_405.setTransform(332,223.75);

	this.instance_406 = new lib.シンボル1();
	this.instance_406.setTransform(146,177.05);

	this.instance_407 = new lib.シンボル1();
	this.instance_407.setTransform(127.5,163.55);

	this.instance_408 = new lib.シンボル1();
	this.instance_408.setTransform(327,202.25);

	this.instance_409 = new lib.シンボル1();
	this.instance_409.setTransform(308.5,188.75);

	this.instance_410 = new lib.シンボル1();
	this.instance_410.setTransform(122.5,142.05);

	this.instance_411 = new lib.シンボル1();
	this.instance_411.setTransform(104,128.55);

	this.instance_412 = new lib.シンボル1();
	this.instance_412.setTransform(214,202.25);

	this.instance_413 = new lib.シンボル1();
	this.instance_413.setTransform(195.5,188.75);

	this.instance_414 = new lib.シンボル1();
	this.instance_414.setTransform(9.5,142.05);

	this.instance_415 = new lib.シンボル1();
	this.instance_415.setTransform(3,167.05,1,1,0,0,180);

	this.instance_416 = new lib.シンボル1();
	this.instance_416.setTransform(448.5,123.55);

	this.instance_417 = new lib.シンボル1();
	this.instance_417.setTransform(430,110.05);

	this.instance_418 = new lib.シンボル1();
	this.instance_418.setTransform(401,76.85);

	this.instance_419 = new lib.シンボル1();
	this.instance_419.setTransform(382.5,63.35);

	this.instance_420 = new lib.シンボル1();
	this.instance_420.setTransform(492.5,137.05);

	this.instance_421 = new lib.シンボル1();
	this.instance_421.setTransform(474,123.55);

	this.instance_422 = new lib.シンボル1();
	this.instance_422.setTransform(288,76.85);

	this.instance_423 = new lib.シンボル1();
	this.instance_423.setTransform(269.5,63.35);

	this.instance_424 = new lib.シンボル1();
	this.instance_424.setTransform(469,102.05);

	this.instance_425 = new lib.シンボル1();
	this.instance_425.setTransform(450.5,88.55);

	this.instance_426 = new lib.シンボル1();
	this.instance_426.setTransform(264.5,41.85);

	this.instance_427 = new lib.シンボル1();
	this.instance_427.setTransform(246,28.35);

	this.instance_428 = new lib.シンボル1();
	this.instance_428.setTransform(356,102.05);

	this.instance_429 = new lib.シンボル1();
	this.instance_429.setTransform(337.5,88.55);

	this.instance_430 = new lib.シンボル1();
	this.instance_430.setTransform(151.5,41.85);

	this.instance_431 = new lib.シンボル1();
	this.instance_431.setTransform(133,28.35);

	this.instance_432 = new lib.シンボル1();
	this.instance_432.setTransform(411.5,183.75);

	this.instance_433 = new lib.シンボル1();
	this.instance_433.setTransform(393,170.25);

	this.instance_434 = new lib.シンボル1();
	this.instance_434.setTransform(364,137.05);

	this.instance_435 = new lib.シンボル1();
	this.instance_435.setTransform(345.5,123.55);

	this.instance_436 = new lib.シンボル1();
	this.instance_436.setTransform(455.5,197.25);

	this.instance_437 = new lib.シンボル1();
	this.instance_437.setTransform(437,183.75);

	this.instance_438 = new lib.シンボル1();
	this.instance_438.setTransform(251,137.05);

	this.instance_439 = new lib.シンボル1();
	this.instance_439.setTransform(232.5,123.55);

	this.instance_440 = new lib.シンボル1();
	this.instance_440.setTransform(432,162.25);

	this.instance_441 = new lib.シンボル1();
	this.instance_441.setTransform(413.5,148.75);

	this.instance_442 = new lib.シンボル1();
	this.instance_442.setTransform(227.5,102.05);

	this.instance_443 = new lib.シンボル1();
	this.instance_443.setTransform(209,88.55);

	this.instance_444 = new lib.シンボル1();
	this.instance_444.setTransform(319,162.25);

	this.instance_445 = new lib.シンボル1();
	this.instance_445.setTransform(300.5,148.75);

	this.instance_446 = new lib.シンボル1();
	this.instance_446.setTransform(114.5,102.05);

	this.instance_447 = new lib.シンボル1();
	this.instance_447.setTransform(96,88.55);

	this.instance_448 = new lib.シンボル1();
	this.instance_448.setTransform(405,190.55);

	this.instance_449 = new lib.シンボル1();
	this.instance_449.setTransform(386.5,177.05);

	this.instance_450 = new lib.シンボル1();
	this.instance_450.setTransform(200.5,130.35);

	this.instance_451 = new lib.シンボル1();
	this.instance_451.setTransform(182,116.85);

	this.instance_452 = new lib.シンボル1();
	this.instance_452.setTransform(292,190.55);

	this.instance_453 = new lib.シンボル1();
	this.instance_453.setTransform(273.5,177.05);

	this.instance_454 = new lib.シンボル1();
	this.instance_454.setTransform(87.5,130.35);

	this.instance_455 = new lib.シンボル1();
	this.instance_455.setTransform(69,116.85);

	this.instance_456 = new lib.シンボル1();
	this.instance_456.setTransform(268.5,155.55);

	this.instance_457 = new lib.シンボル1();
	this.instance_457.setTransform(250,142.05);

	this.instance_458 = new lib.シンボル1();
	this.instance_458.setTransform(64,95.35);

	this.instance_459 = new lib.シンボル1();
	this.instance_459.setTransform(45.5,81.85);

	this.instance_460 = new lib.シンボル1();
	this.instance_460.setTransform(155.5,155.55);

	this.instance_461 = new lib.シンボル1();
	this.instance_461.setTransform(137,142.05);

	this.instance_462 = new lib.シンボル1();
	this.instance_462.setTransform(43,133.85,1,1,0,0,180);

	this.instance_463 = new lib.シンボル1();
	this.instance_463.setTransform(61.5,120.35,1,1,0,0,180);

	this.instance_464 = new lib.シンボル1();
	this.instance_464.setTransform(368,250.75);

	this.instance_465 = new lib.シンボル1();
	this.instance_465.setTransform(349.5,237.25);

	this.instance_466 = new lib.シンボル1();
	this.instance_466.setTransform(163.5,190.55);

	this.instance_467 = new lib.シンボル1();
	this.instance_467.setTransform(145,177.05);

	this.instance_468 = new lib.シンボル1();
	this.instance_468.setTransform(255,250.75);

	this.instance_469 = new lib.シンボル1();
	this.instance_469.setTransform(236.5,237.25);

	this.instance_470 = new lib.シンボル1();
	this.instance_470.setTransform(50.5,190.55);

	this.instance_471 = new lib.シンボル1();
	this.instance_471.setTransform(32,177.05);

	this.instance_472 = new lib.シンボル1();
	this.instance_472.setTransform(231.5,215.75);

	this.instance_473 = new lib.シンボル1();
	this.instance_473.setTransform(213,202.25);

	this.instance_474 = new lib.シンボル1();
	this.instance_474.setTransform(27,155.55);

	this.instance_475 = new lib.シンボル1();
	this.instance_475.setTransform(8.5,142.05);

	this.instance_476 = new lib.シンボル1();
	this.instance_476.setTransform(118.5,215.75);

	this.instance_477 = new lib.シンボル1();
	this.instance_477.setTransform(100,202.25);

	this.instance_478 = new lib.シンボル1();
	this.instance_478.setTransform(80,194.05,1,1,0,0,180);

	this.instance_479 = new lib.シンボル1();
	this.instance_479.setTransform(98.5,180.55,1,1,0,0,180);

	this.instance_480 = new lib.シンボル1();
	this.instance_480.setTransform(510,150.55);

	this.instance_481 = new lib.シンボル1();
	this.instance_481.setTransform(491.5,137.05);

	this.instance_482 = new lib.シンボル1();
	this.instance_482.setTransform(305.5,90.35);

	this.instance_483 = new lib.シンボル1();
	this.instance_483.setTransform(287,76.85);

	this.instance_484 = new lib.シンボル1();
	this.instance_484.setTransform(397,150.55);

	this.instance_485 = new lib.シンボル1();
	this.instance_485.setTransform(378.5,137.05);

	this.instance_486 = new lib.シンボル1();
	this.instance_486.setTransform(192.5,90.35);

	this.instance_487 = new lib.シンボル1();
	this.instance_487.setTransform(174,76.85);

	this.instance_488 = new lib.シンボル1();
	this.instance_488.setTransform(373.5,115.55);

	this.instance_489 = new lib.シンボル1();
	this.instance_489.setTransform(355,102.05);

	this.instance_490 = new lib.シンボル1();
	this.instance_490.setTransform(169,55.35);

	this.instance_491 = new lib.シンボル1();
	this.instance_491.setTransform(150.5,41.85);

	this.instance_492 = new lib.シンボル1();
	this.instance_492.setTransform(260.5,115.55);

	this.instance_493 = new lib.シンボル1();
	this.instance_493.setTransform(242,102.05);

	this.instance_494 = new lib.シンボル1();
	this.instance_494.setTransform(56,55.35);

	this.instance_495 = new lib.シンボル1();
	this.instance_495.setTransform(37.5,41.85);

	this.instance_496 = new lib.シンボル1();
	this.instance_496.setTransform(473,210.75);

	this.instance_497 = new lib.シンボル1();
	this.instance_497.setTransform(454.5,197.25);

	this.instance_498 = new lib.シンボル1();
	this.instance_498.setTransform(268.5,150.55);

	this.instance_499 = new lib.シンボル1();
	this.instance_499.setTransform(250,137.05);

	this.instance_500 = new lib.シンボル1();
	this.instance_500.setTransform(360,210.75);

	this.instance_501 = new lib.シンボル1();
	this.instance_501.setTransform(341.5,197.25);

	this.instance_502 = new lib.シンボル1();
	this.instance_502.setTransform(155.5,150.55);

	this.instance_503 = new lib.シンボル1();
	this.instance_503.setTransform(137,137.05);

	this.instance_504 = new lib.シンボル1();
	this.instance_504.setTransform(336.5,175.75);

	this.instance_505 = new lib.シンボル1();
	this.instance_505.setTransform(318,162.25);

	this.instance_506 = new lib.シンボル1();
	this.instance_506.setTransform(132,115.55);

	this.instance_507 = new lib.シンボル1();
	this.instance_507.setTransform(113.5,102.05);

	this.instance_508 = new lib.シンボル1();
	this.instance_508.setTransform(223.5,175.75);

	this.instance_509 = new lib.シンボル1();
	this.instance_509.setTransform(205,162.25);

	this.instance_510 = new lib.シンボル1();
	this.instance_510.setTransform(19,115.55);

	this.instance_511 = new lib.シンボル1();
	this.instance_511.setTransform(0.5,102.05);

	this.instance_512 = new lib.シンボル1();
	this.instance_512.setTransform(457.5,163.55);

	this.instance_513 = new lib.シンボル1();
	this.instance_513.setTransform(439,150.05);

	this.instance_514 = new lib.シンボル1();
	this.instance_514.setTransform(253,103.35);

	this.instance_515 = new lib.シンボル1();
	this.instance_515.setTransform(234.5,89.85);

	this.instance_516 = new lib.シンボル1();
	this.instance_516.setTransform(344.5,163.55);

	this.instance_517 = new lib.シンボル1();
	this.instance_517.setTransform(326,150.05);

	this.instance_518 = new lib.シンボル1();
	this.instance_518.setTransform(140,103.35);

	this.instance_519 = new lib.シンボル1();
	this.instance_519.setTransform(121.5,89.85);

	this.instance_520 = new lib.シンボル1();
	this.instance_520.setTransform(321,128.55);

	this.instance_521 = new lib.シンボル1();
	this.instance_521.setTransform(302.5,115.05);

	this.instance_522 = new lib.シンボル1();
	this.instance_522.setTransform(116.5,68.35);

	this.instance_523 = new lib.シンボル1();
	this.instance_523.setTransform(98,54.85);

	this.instance_524 = new lib.シンボル1();
	this.instance_524.setTransform(208,128.55);

	this.instance_525 = new lib.シンボル1();
	this.instance_525.setTransform(189.5,115.05);

	this.instance_526 = new lib.シンボル1();
	this.instance_526.setTransform(3.5,68.35);

	this.instance_527 = new lib.シンボル1();
	this.instance_527.setTransform(-15,54.85);

	this.instance_528 = new lib.シンボル1();
	this.instance_528.setTransform(420.5,223.75);

	this.instance_529 = new lib.シンボル1();
	this.instance_529.setTransform(402,210.25);

	this.instance_530 = new lib.シンボル1();
	this.instance_530.setTransform(216,163.55);

	this.instance_531 = new lib.シンボル1();
	this.instance_531.setTransform(197.5,150.05);

	this.instance_532 = new lib.シンボル1();
	this.instance_532.setTransform(307.5,223.75);

	this.instance_533 = new lib.シンボル1();
	this.instance_533.setTransform(289,210.25);

	this.instance_534 = new lib.シンボル1();
	this.instance_534.setTransform(103,163.55);

	this.instance_535 = new lib.シンボル1();
	this.instance_535.setTransform(84.5,150.05);

	this.instance_536 = new lib.シンボル1();
	this.instance_536.setTransform(284,188.75);

	this.instance_537 = new lib.シンボル1();
	this.instance_537.setTransform(265.5,175.25);

	this.instance_538 = new lib.シンボル1();
	this.instance_538.setTransform(79.5,128.55);

	this.instance_539 = new lib.シンボル1();
	this.instance_539.setTransform(61,115.05);

	this.instance_540 = new lib.シンボル1();
	this.instance_540.setTransform(171,188.75);

	this.instance_541 = new lib.シンボル1();
	this.instance_541.setTransform(152.5,175.25);

	this.instance_542 = new lib.シンボル1();
	this.instance_542.setTransform(-22.5,167.05,1,1,0,0,180);

	this.instance_543 = new lib.シンボル1();
	this.instance_543.setTransform(-4,153.55,1,1,0,0,180);

	this.instance_544 = new lib.シンボル1();
	this.instance_544.setTransform(405.5,110.05);

	this.instance_545 = new lib.シンボル1();
	this.instance_545.setTransform(387,96.55);

	this.instance_546 = new lib.シンボル1();
	this.instance_546.setTransform(358,63.35);

	this.instance_547 = new lib.シンボル1();
	this.instance_547.setTransform(339.5,49.85);

	this.instance_548 = new lib.シンボル1();
	this.instance_548.setTransform(449.5,123.55);

	this.instance_549 = new lib.シンボル1();
	this.instance_549.setTransform(431,110.05);

	this.instance_550 = new lib.シンボル1();
	this.instance_550.setTransform(245,63.35);

	this.instance_551 = new lib.シンボル1();
	this.instance_551.setTransform(226.5,49.85);

	this.instance_552 = new lib.シンボル1();
	this.instance_552.setTransform(426,88.55);

	this.instance_553 = new lib.シンボル1();
	this.instance_553.setTransform(407.5,75.05);

	this.instance_554 = new lib.シンボル1();
	this.instance_554.setTransform(221.5,28.35);

	this.instance_555 = new lib.シンボル1();
	this.instance_555.setTransform(203,14.85);

	this.instance_556 = new lib.シンボル1();
	this.instance_556.setTransform(313,88.55);

	this.instance_557 = new lib.シンボル1();
	this.instance_557.setTransform(294.5,75.05);

	this.instance_558 = new lib.シンボル1();
	this.instance_558.setTransform(108.5,28.35);

	this.instance_559 = new lib.シンボル1();
	this.instance_559.setTransform(90,14.85);

	this.instance_560 = new lib.シンボル1();
	this.instance_560.setTransform(368.5,170.25);

	this.instance_561 = new lib.シンボル1();
	this.instance_561.setTransform(350,156.75);

	this.instance_562 = new lib.シンボル1();
	this.instance_562.setTransform(321,123.55);

	this.instance_563 = new lib.シンボル1();
	this.instance_563.setTransform(302.5,110.05);

	this.instance_564 = new lib.シンボル1();
	this.instance_564.setTransform(412.5,183.75);

	this.instance_565 = new lib.シンボル1();
	this.instance_565.setTransform(394,170.25);

	this.instance_566 = new lib.シンボル1();
	this.instance_566.setTransform(208,123.55);

	this.instance_567 = new lib.シンボル1();
	this.instance_567.setTransform(189.5,110.05);

	this.instance_568 = new lib.シンボル1();
	this.instance_568.setTransform(389,148.75);

	this.instance_569 = new lib.シンボル1();
	this.instance_569.setTransform(370.5,135.25);

	this.instance_570 = new lib.シンボル1();
	this.instance_570.setTransform(184.5,88.55);

	this.instance_571 = new lib.シンボル1();
	this.instance_571.setTransform(166,75.05);

	this.instance_572 = new lib.シンボル1();
	this.instance_572.setTransform(276,148.75);

	this.instance_573 = new lib.シンボル1();
	this.instance_573.setTransform(257.5,135.25);

	this.instance_574 = new lib.シンボル1();
	this.instance_574.setTransform(71.5,88.55);

	this.instance_575 = new lib.シンボル1();
	this.instance_575.setTransform(53,75.05);

	this.instance_576 = new lib.シンボル1();
	this.instance_576.setTransform(362,177.05);

	this.instance_577 = new lib.シンボル1();
	this.instance_577.setTransform(343.5,163.55);

	this.instance_578 = new lib.シンボル1();
	this.instance_578.setTransform(157.5,116.85);

	this.instance_579 = new lib.シンボル1();
	this.instance_579.setTransform(139,103.35);

	this.instance_580 = new lib.シンボル1();
	this.instance_580.setTransform(249,177.05);

	this.instance_581 = new lib.シンボル1();
	this.instance_581.setTransform(230.5,163.55);

	this.instance_582 = new lib.シンボル1();
	this.instance_582.setTransform(44.5,116.85);

	this.instance_583 = new lib.シンボル1();
	this.instance_583.setTransform(26,103.35);

	this.instance_584 = new lib.シンボル1();
	this.instance_584.setTransform(225.5,142.05);

	this.instance_585 = new lib.シンボル1();
	this.instance_585.setTransform(207,128.55);

	this.instance_586 = new lib.シンボル1();
	this.instance_586.setTransform(21,81.85);

	this.instance_587 = new lib.シンボル1();
	this.instance_587.setTransform(2.5,68.35);

	this.instance_588 = new lib.シンボル1();
	this.instance_588.setTransform(112.5,142.05);

	this.instance_589 = new lib.シンボル1();
	this.instance_589.setTransform(94,128.55);

	this.instance_590 = new lib.シンボル1();
	this.instance_590.setTransform(36,120.35,1,1,0,0,180);

	this.instance_591 = new lib.シンボル1();
	this.instance_591.setTransform(54.5,106.85,1,1,0,0,180);

	this.instance_592 = new lib.シンボル1();
	this.instance_592.setTransform(325,237.25);

	this.instance_593 = new lib.シンボル1();
	this.instance_593.setTransform(306.5,223.75);

	this.instance_594 = new lib.シンボル1();
	this.instance_594.setTransform(120.5,177.05);

	this.instance_595 = new lib.シンボル1();
	this.instance_595.setTransform(102,163.55);

	this.instance_596 = new lib.シンボル1();
	this.instance_596.setTransform(212,237.25);

	this.instance_597 = new lib.シンボル1();
	this.instance_597.setTransform(193.5,223.75);

	this.instance_598 = new lib.シンボル1();
	this.instance_598.setTransform(7.5,177.05);

	this.instance_599 = new lib.シンボル1();
	this.instance_599.setTransform(-11,163.55);

	this.instance_600 = new lib.シンボル1();
	this.instance_600.setTransform(188.5,202.25);

	this.instance_601 = new lib.シンボル1();
	this.instance_601.setTransform(170,188.75);

	this.instance_602 = new lib.シンボル1();
	this.instance_602.setTransform(-16,142.05);

	this.instance_603 = new lib.シンボル1();
	this.instance_603.setTransform(-21.5,167.05,1,1,0,0,180);

	this.instance_604 = new lib.シンボル1();
	this.instance_604.setTransform(75.5,202.25);

	this.instance_605 = new lib.シンボル1();
	this.instance_605.setTransform(57,188.75);

	this.instance_606 = new lib.シンボル1();
	this.instance_606.setTransform(73,180.55,1,1,0,0,180);

	this.instance_607 = new lib.シンボル1();
	this.instance_607.setTransform(91.5,167.05,1,1,0,0,180);

	this.instance_608 = new lib.シンボル1();
	this.instance_608.setTransform(467,137.05);

	this.instance_609 = new lib.シンボル1();
	this.instance_609.setTransform(448.5,123.55);

	this.instance_610 = new lib.シンボル1();
	this.instance_610.setTransform(262.5,76.85);

	this.instance_611 = new lib.シンボル1();
	this.instance_611.setTransform(244,63.35);

	this.instance_612 = new lib.シンボル1();
	this.instance_612.setTransform(354,137.05);

	this.instance_613 = new lib.シンボル1();
	this.instance_613.setTransform(335.5,123.55);

	this.instance_614 = new lib.シンボル1();
	this.instance_614.setTransform(149.5,76.85);

	this.instance_615 = new lib.シンボル1();
	this.instance_615.setTransform(131,63.35);

	this.instance_616 = new lib.シンボル1();
	this.instance_616.setTransform(330.5,102.05);

	this.instance_617 = new lib.シンボル1();
	this.instance_617.setTransform(312,88.55);

	this.instance_618 = new lib.シンボル1();
	this.instance_618.setTransform(126,41.85);

	this.instance_619 = new lib.シンボル1();
	this.instance_619.setTransform(107.5,28.35);

	this.instance_620 = new lib.シンボル1();
	this.instance_620.setTransform(217.5,102.05);

	this.instance_621 = new lib.シンボル1();
	this.instance_621.setTransform(199,88.55);

	this.instance_622 = new lib.シンボル1();
	this.instance_622.setTransform(13,41.85);

	this.instance_623 = new lib.シンボル1();
	this.instance_623.setTransform(-5.5,28.35);

	this.instance_624 = new lib.シンボル1();
	this.instance_624.setTransform(430,197.25);

	this.instance_625 = new lib.シンボル1();
	this.instance_625.setTransform(411.5,183.75);

	this.instance_626 = new lib.シンボル1();
	this.instance_626.setTransform(225.5,137.05);

	this.instance_627 = new lib.シンボル1();
	this.instance_627.setTransform(207,123.55);

	this.instance_628 = new lib.シンボル1();
	this.instance_628.setTransform(317,197.25);

	this.instance_629 = new lib.シンボル1();
	this.instance_629.setTransform(298.5,183.75);

	this.instance_630 = new lib.シンボル1();
	this.instance_630.setTransform(112.5,137.05);

	this.instance_631 = new lib.シンボル1();
	this.instance_631.setTransform(94,123.55);

	this.instance_632 = new lib.シンボル1();
	this.instance_632.setTransform(293.5,162.25);

	this.instance_633 = new lib.シンボル1();
	this.instance_633.setTransform(275,148.75);

	this.instance_634 = new lib.シンボル1();
	this.instance_634.setTransform(89,102.05);

	this.instance_635 = new lib.シンボル1();
	this.instance_635.setTransform(70.5,88.55);

	this.instance_636 = new lib.シンボル1();
	this.instance_636.setTransform(180.5,162.25);

	this.instance_637 = new lib.シンボル1();
	this.instance_637.setTransform(162,148.75);

	this.instance_638 = new lib.シンボル1();
	this.instance_638.setTransform(-24,102.05);

	this.instance_639 = new lib.シンボル1();
	this.instance_639.setTransform(-13.5,127.05,1,1,0,0,180);

	this.instance_640 = new lib.シンボル1();
	this.instance_640.setTransform(388.5,127.05);

	this.instance_641 = new lib.シンボル1();
	this.instance_641.setTransform(370,113.55);

	this.instance_642 = new lib.シンボル1();
	this.instance_642.setTransform(341,80.35);

	this.instance_643 = new lib.シンボル1();
	this.instance_643.setTransform(322.5,66.85);

	this.instance_644 = new lib.シンボル1();
	this.instance_644.setTransform(432.5,140.55);

	this.instance_645 = new lib.シンボル1();
	this.instance_645.setTransform(414,127.05);

	this.instance_646 = new lib.シンボル1();
	this.instance_646.setTransform(228,80.35);

	this.instance_647 = new lib.シンボル1();
	this.instance_647.setTransform(209.5,66.85);

	this.instance_648 = new lib.シンボル1();
	this.instance_648.setTransform(409,105.55);

	this.instance_649 = new lib.シンボル1();
	this.instance_649.setTransform(390.5,92.05);

	this.instance_650 = new lib.シンボル1();
	this.instance_650.setTransform(204.5,45.35);

	this.instance_651 = new lib.シンボル1();
	this.instance_651.setTransform(186,31.85);

	this.instance_652 = new lib.シンボル1();
	this.instance_652.setTransform(296,105.55);

	this.instance_653 = new lib.シンボル1();
	this.instance_653.setTransform(277.5,92.05);

	this.instance_654 = new lib.シンボル1();
	this.instance_654.setTransform(91.5,45.35);

	this.instance_655 = new lib.シンボル1();
	this.instance_655.setTransform(73,31.85);

	this.instance_656 = new lib.シンボル1();
	this.instance_656.setTransform(351.5,187.25);

	this.instance_657 = new lib.シンボル1();
	this.instance_657.setTransform(490,187.25);

	this.instance_658 = new lib.シンボル1();
	this.instance_658.setTransform(304,140.55);

	this.instance_659 = new lib.シンボル1();
	this.instance_659.setTransform(285.5,127.05);

	this.instance_660 = new lib.シンボル1();
	this.instance_660.setTransform(395.5,200.75);

	this.instance_661 = new lib.シンボル1();
	this.instance_661.setTransform(377,187.25);

	this.instance_662 = new lib.シンボル1();
	this.instance_662.setTransform(191,140.55);

	this.instance_663 = new lib.シンボル1();
	this.instance_663.setTransform(172.5,127.05);

	this.instance_664 = new lib.シンボル1();
	this.instance_664.setTransform(372,165.75);

	this.instance_665 = new lib.シンボル1();
	this.instance_665.setTransform(353.5,152.25);

	this.instance_666 = new lib.シンボル1();
	this.instance_666.setTransform(167.5,105.55);

	this.instance_667 = new lib.シンボル1();
	this.instance_667.setTransform(149,92.05);

	this.instance_668 = new lib.シンボル1();
	this.instance_668.setTransform(259,165.75);

	this.instance_669 = new lib.シンボル1();
	this.instance_669.setTransform(240.5,152.25);

	this.instance_670 = new lib.シンボル1();
	this.instance_670.setTransform(54.5,105.55);

	this.instance_671 = new lib.シンボル1();
	this.instance_671.setTransform(36,92.05);

	this.instance_672 = new lib.シンボル1();
	this.instance_672.setTransform(493.5,87.05);

	this.instance_673 = new lib.シンボル1();
	this.instance_673.setTransform(475,73.55);

	this.instance_674 = new lib.シンボル1();
	this.instance_674.setTransform(446,40.35);

	this.instance_675 = new lib.シンボル1();
	this.instance_675.setTransform(427.5,26.85);

	this.instance_676 = new lib.シンボル1();
	this.instance_676.setTransform(380.5,87.05);

	this.instance_677 = new lib.シンボル1();
	this.instance_677.setTransform(362,73.55);

	this.instance_678 = new lib.シンボル1();
	this.instance_678.setTransform(333,40.35);

	this.instance_679 = new lib.シンボル1();
	this.instance_679.setTransform(314.5,26.85);

	this.instance_680 = new lib.シンボル1();
	this.instance_680.setTransform(357,52.05);

	this.instance_681 = new lib.シンボル1();
	this.instance_681.setTransform(338.5,38.55);

	this.instance_682 = new lib.シンボル1();
	this.instance_682.setTransform(309.5,5.35);

	this.instance_683 = new lib.シンボル1();
	this.instance_683.setTransform(291,-8.15);

	this.instance_684 = new lib.シンボル1();
	this.instance_684.setTransform(401,65.55);

	this.instance_685 = new lib.シンボル1();
	this.instance_685.setTransform(382.5,52.05);

	this.instance_686 = new lib.シンボル1();
	this.instance_686.setTransform(196.5,5.35);

	this.instance_687 = new lib.シンボル1();
	this.instance_687.setTransform(178,-8.15);

	this.instance_688 = new lib.シンボル1();
	this.instance_688.setTransform(456.5,147.25);

	this.instance_689 = new lib.シンボル1();
	this.instance_689.setTransform(438,133.75);

	this.instance_690 = new lib.シンボル1();
	this.instance_690.setTransform(409,100.55);

	this.instance_691 = new lib.シンボル1();
	this.instance_691.setTransform(390.5,87.05);

	this.instance_692 = new lib.シンボル1();
	this.instance_692.setTransform(343.5,147.25);

	this.instance_693 = new lib.シンボル1();
	this.instance_693.setTransform(482,147.25);

	this.instance_694 = new lib.シンボル1();
	this.instance_694.setTransform(296,100.55);

	this.instance_695 = new lib.シンボル1();
	this.instance_695.setTransform(277.5,87.05);

	this.instance_696 = new lib.シンボル1();
	this.instance_696.setTransform(477,125.75);

	this.instance_697 = new lib.シンボル1();
	this.instance_697.setTransform(458.5,112.25);

	this.instance_698 = new lib.シンボル1();
	this.instance_698.setTransform(272.5,65.55);

	this.instance_699 = new lib.シンボル1();
	this.instance_699.setTransform(254,52.05);

	this.instance_700 = new lib.シンボル1();
	this.instance_700.setTransform(364,125.75);

	this.instance_701 = new lib.シンボル1();
	this.instance_701.setTransform(345.5,112.25);

	this.instance_702 = new lib.シンボル1();
	this.instance_702.setTransform(159.5,65.55);

	this.instance_703 = new lib.シンボル1();
	this.instance_703.setTransform(141,52.05);

	this.instance_704 = new lib.シンボル1();
	this.instance_704.setTransform(450,154.05);

	this.instance_705 = new lib.シンボル1();
	this.instance_705.setTransform(431.5,140.55);

	this.instance_706 = new lib.シンボル1();
	this.instance_706.setTransform(245.5,93.85);

	this.instance_707 = new lib.シンボル1();
	this.instance_707.setTransform(227,80.35);

	this.instance_708 = new lib.シンボル1();
	this.instance_708.setTransform(337,154.05);

	this.instance_709 = new lib.シンボル1();
	this.instance_709.setTransform(318.5,140.55);

	this.instance_710 = new lib.シンボル1();
	this.instance_710.setTransform(132.5,93.85);

	this.instance_711 = new lib.シンボル1();
	this.instance_711.setTransform(114,80.35);

	this.instance_712 = new lib.シンボル1();
	this.instance_712.setTransform(313.5,119.05);

	this.instance_713 = new lib.シンボル1();
	this.instance_713.setTransform(295,105.55);

	this.instance_714 = new lib.シンボル1();
	this.instance_714.setTransform(109,58.85);

	this.instance_715 = new lib.シンボル1();
	this.instance_715.setTransform(90.5,45.35);

	this.instance_716 = new lib.シンボル1();
	this.instance_716.setTransform(200.5,119.05);

	this.instance_717 = new lib.シンボル1();
	this.instance_717.setTransform(182,105.55);

	this.instance_718 = new lib.シンボル1();
	this.instance_718.setTransform(-4,58.85);

	this.instance_719 = new lib.シンボル1();
	this.instance_719.setTransform(-22.5,45.35);

	this.instance_720 = new lib.シンボル1();
	this.instance_720.setTransform(413,214.25);

	this.instance_721 = new lib.シンボル1();
	this.instance_721.setTransform(394.5,200.75);

	this.instance_722 = new lib.シンボル1();
	this.instance_722.setTransform(208.5,154.05);

	this.instance_723 = new lib.シンボル1();
	this.instance_723.setTransform(190,140.55);

	this.instance_724 = new lib.シンボル1();
	this.instance_724.setTransform(300,214.25);

	this.instance_725 = new lib.シンボル1();
	this.instance_725.setTransform(281.5,200.75);

	this.instance_726 = new lib.シンボル1();
	this.instance_726.setTransform(95.5,154.05);

	this.instance_727 = new lib.シンボル1();
	this.instance_727.setTransform(77,140.55);

	this.instance_728 = new lib.シンボル1();
	this.instance_728.setTransform(276.5,179.25);

	this.instance_729 = new lib.シンボル1();
	this.instance_729.setTransform(258,165.75);

	this.instance_730 = new lib.シンボル1();
	this.instance_730.setTransform(72,119.05);

	this.instance_731 = new lib.シンボル1();
	this.instance_731.setTransform(53.5,105.55);

	this.instance_732 = new lib.シンボル1();
	this.instance_732.setTransform(163.5,179.25);

	this.instance_733 = new lib.シンボル1();
	this.instance_733.setTransform(145,165.75);

	this.instance_734 = new lib.シンボル1();
	this.instance_734.setTransform(-15,157.55,1,1,0,0,180);

	this.instance_735 = new lib.シンボル1();
	this.instance_735.setTransform(3.5,144.05,1,1,0,0,180);

	this.instance_736 = new lib.シンボル1();
	this.instance_736.setTransform(398,100.55);

	this.instance_737 = new lib.シンボル1();
	this.instance_737.setTransform(379.5,87.05);

	this.instance_738 = new lib.シンボル1();
	this.instance_738.setTransform(350.5,53.85);

	this.instance_739 = new lib.シンボル1();
	this.instance_739.setTransform(332,40.35);

	this.instance_740 = new lib.シンボル1();
	this.instance_740.setTransform(442,114.05);

	this.instance_741 = new lib.シンボル1();
	this.instance_741.setTransform(423.5,100.55);

	this.instance_742 = new lib.シンボル1();
	this.instance_742.setTransform(237.5,53.85);

	this.instance_743 = new lib.シンボル1();
	this.instance_743.setTransform(219,40.35);

	this.instance_744 = new lib.シンボル1();
	this.instance_744.setTransform(418.5,79.05);

	this.instance_745 = new lib.シンボル1();
	this.instance_745.setTransform(400,65.55);

	this.instance_746 = new lib.シンボル1();
	this.instance_746.setTransform(214,18.85);

	this.instance_747 = new lib.シンボル1();
	this.instance_747.setTransform(195.5,5.35);

	this.instance_748 = new lib.シンボル1();
	this.instance_748.setTransform(305.5,79.05);

	this.instance_749 = new lib.シンボル1();
	this.instance_749.setTransform(287,65.55);

	this.instance_750 = new lib.シンボル1();
	this.instance_750.setTransform(101,18.85);

	this.instance_751 = new lib.シンボル1();
	this.instance_751.setTransform(82.5,5.35);

	this.instance_752 = new lib.シンボル1();
	this.instance_752.setTransform(361,160.75);

	this.instance_753 = new lib.シンボル1();
	this.instance_753.setTransform(342.5,147.25);

	this.instance_754 = new lib.シンボル1();
	this.instance_754.setTransform(313.5,114.05);

	this.instance_755 = new lib.シンボル1();
	this.instance_755.setTransform(295,100.55);

	this.instance_756 = new lib.シンボル1();
	this.instance_756.setTransform(405,174.25);

	this.instance_757 = new lib.シンボル1();
	this.instance_757.setTransform(386.5,160.75);

	this.instance_758 = new lib.シンボル1();
	this.instance_758.setTransform(200.5,114.05);

	this.instance_759 = new lib.シンボル1();
	this.instance_759.setTransform(182,100.55);

	this.instance_760 = new lib.シンボル1();
	this.instance_760.setTransform(381.5,139.25);

	this.instance_761 = new lib.シンボル1();
	this.instance_761.setTransform(363,125.75);

	this.instance_762 = new lib.シンボル1();
	this.instance_762.setTransform(177,79.05);

	this.instance_763 = new lib.シンボル1();
	this.instance_763.setTransform(158.5,65.55);

	this.instance_764 = new lib.シンボル1();
	this.instance_764.setTransform(268.5,139.25);

	this.instance_765 = new lib.シンボル1();
	this.instance_765.setTransform(250,125.75);

	this.instance_766 = new lib.シンボル1();
	this.instance_766.setTransform(64,79.05);

	this.instance_767 = new lib.シンボル1();
	this.instance_767.setTransform(45.5,65.55);

	this.instance_768 = new lib.シンボル1();
	this.instance_768.setTransform(387.5,177.05);

	this.instance_769 = new lib.シンボル1();
	this.instance_769.setTransform(369,163.55);

	this.instance_770 = new lib.シンボル1();
	this.instance_770.setTransform(183,116.85);

	this.instance_771 = new lib.シンボル1();
	this.instance_771.setTransform(164.5,103.35);

	this.instance_772 = new lib.シンボル1();
	this.instance_772.setTransform(274.5,177.05);

	this.instance_773 = new lib.シンボル1();
	this.instance_773.setTransform(256,163.55);

	this.instance_774 = new lib.シンボル1();
	this.instance_774.setTransform(70,116.85);

	this.instance_775 = new lib.シンボル1();
	this.instance_775.setTransform(51.5,103.35);

	this.instance_776 = new lib.シンボル1();
	this.instance_776.setTransform(251,142.05);

	this.instance_777 = new lib.シンボル1();
	this.instance_777.setTransform(232.5,128.55);

	this.instance_778 = new lib.シンボル1();
	this.instance_778.setTransform(46.5,81.85);

	this.instance_779 = new lib.シンボル1();
	this.instance_779.setTransform(28,68.35);

	this.instance_780 = new lib.シンボル1();
	this.instance_780.setTransform(138,142.05);

	this.instance_781 = new lib.シンボル1();
	this.instance_781.setTransform(119.5,128.55);

	this.instance_782 = new lib.シンボル1();
	this.instance_782.setTransform(10.5,120.35,1,1,0,0,180);

	this.instance_783 = new lib.シンボル1();
	this.instance_783.setTransform(29,106.85,1,1,0,0,180);

	this.instance_784 = new lib.シンボル1();
	this.instance_784.setTransform(350.5,237.25);

	this.instance_785 = new lib.シンボル1();
	this.instance_785.setTransform(332,223.75);

	this.instance_786 = new lib.シンボル1();
	this.instance_786.setTransform(146,177.05);

	this.instance_787 = new lib.シンボル1();
	this.instance_787.setTransform(127.5,163.55);

	this.instance_788 = new lib.シンボル1();
	this.instance_788.setTransform(237.5,237.25);

	this.instance_789 = new lib.シンボル1();
	this.instance_789.setTransform(219,223.75);

	this.instance_790 = new lib.シンボル1();
	this.instance_790.setTransform(33,177.05);

	this.instance_791 = new lib.シンボル1();
	this.instance_791.setTransform(14.5,163.55);

	this.instance_792 = new lib.シンボル1();
	this.instance_792.setTransform(214,202.25);

	this.instance_793 = new lib.シンボル1();
	this.instance_793.setTransform(195.5,188.75);

	this.instance_794 = new lib.シンボル1();
	this.instance_794.setTransform(9.5,142.05);

	this.instance_795 = new lib.シンボル1();
	this.instance_795.setTransform(-9,128.55);

	this.instance_796 = new lib.シンボル1();
	this.instance_796.setTransform(101,202.25);

	this.instance_797 = new lib.シンボル1();
	this.instance_797.setTransform(82.5,188.75);

	this.instance_798 = new lib.シンボル1();
	this.instance_798.setTransform(47.5,180.55,1,1,0,0,180);

	this.instance_799 = new lib.シンボル1();
	this.instance_799.setTransform(66,167.05,1,1,0,0,180);

	this.instance_800 = new lib.シンボル1();
	this.instance_800.setTransform(335.5,123.55);

	this.instance_801 = new lib.シンボル1();
	this.instance_801.setTransform(474,123.55);

	this.instance_802 = new lib.シンボル1();
	this.instance_802.setTransform(288,76.85);

	this.instance_803 = new lib.シンボル1();
	this.instance_803.setTransform(269.5,63.35);

	this.instance_804 = new lib.シンボル1();
	this.instance_804.setTransform(379.5,137.05);

	this.instance_805 = new lib.シンボル1();
	this.instance_805.setTransform(361,123.55);

	this.instance_806 = new lib.シンボル1();
	this.instance_806.setTransform(175,76.85);

	this.instance_807 = new lib.シンボル1();
	this.instance_807.setTransform(156.5,63.35);

	this.instance_808 = new lib.シンボル1();
	this.instance_808.setTransform(356,102.05);

	this.instance_809 = new lib.シンボル1();
	this.instance_809.setTransform(337.5,88.55);

	this.instance_810 = new lib.シンボル1();
	this.instance_810.setTransform(151.5,41.85);

	this.instance_811 = new lib.シンボル1();
	this.instance_811.setTransform(133,28.35);

	this.instance_812 = new lib.シンボル1();
	this.instance_812.setTransform(243,102.05);

	this.instance_813 = new lib.シンボル1();
	this.instance_813.setTransform(224.5,88.55);

	this.instance_814 = new lib.シンボル1();
	this.instance_814.setTransform(38.5,41.85);

	this.instance_815 = new lib.シンボル1();
	this.instance_815.setTransform(20,28.35);

	this.instance_816 = new lib.シンボル1();
	this.instance_816.setTransform(455.5,197.25);

	this.instance_817 = new lib.シンボル1();
	this.instance_817.setTransform(437,183.75);

	this.instance_818 = new lib.シンボル1();
	this.instance_818.setTransform(251,137.05);

	this.instance_819 = new lib.シンボル1();
	this.instance_819.setTransform(232.5,123.55);

	this.instance_820 = new lib.シンボル1();
	this.instance_820.setTransform(342.5,197.25);

	this.instance_821 = new lib.シンボル1();
	this.instance_821.setTransform(324,183.75);

	this.instance_822 = new lib.シンボル1();
	this.instance_822.setTransform(138,137.05);

	this.instance_823 = new lib.シンボル1();
	this.instance_823.setTransform(119.5,123.55);

	this.instance_824 = new lib.シンボル1();
	this.instance_824.setTransform(319,162.25);

	this.instance_825 = new lib.シンボル1();
	this.instance_825.setTransform(300.5,148.75);

	this.instance_826 = new lib.シンボル1();
	this.instance_826.setTransform(114.5,102.05);

	this.instance_827 = new lib.シンボル1();
	this.instance_827.setTransform(96,88.55);

	this.instance_828 = new lib.シンボル1();
	this.instance_828.setTransform(206,162.25);

	this.instance_829 = new lib.シンボル1();
	this.instance_829.setTransform(187.5,148.75);

	this.instance_830 = new lib.シンボル1();
	this.instance_830.setTransform(1.5,102.05);

	this.instance_831 = new lib.シンボル1();
	this.instance_831.setTransform(-17,88.55);

	this.instance_832 = new lib.シンボル1();
	this.instance_832.setTransform(292,190.55);

	this.instance_833 = new lib.シンボル1();
	this.instance_833.setTransform(273.5,177.05);

	this.instance_834 = new lib.シンボル1();
	this.instance_834.setTransform(87.5,130.35);

	this.instance_835 = new lib.シンボル1();
	this.instance_835.setTransform(69,116.85);

	this.instance_836 = new lib.シンボル1();
	this.instance_836.setTransform(179,190.55);

	this.instance_837 = new lib.シンボル1();
	this.instance_837.setTransform(160.5,177.05);

	this.instance_838 = new lib.シンボル1();
	this.instance_838.setTransform(-25.5,130.35);

	this.instance_839 = new lib.シンボル1();
	this.instance_839.setTransform(-12,155.35,1,1,0,0,180);

	this.instance_840 = new lib.シンボル1();
	this.instance_840.setTransform(155.5,155.55);

	this.instance_841 = new lib.シンボル1();
	this.instance_841.setTransform(137,142.05);

	this.instance_842 = new lib.シンボル1();
	this.instance_842.setTransform(-7,133.85,1,1,0,0,180);

	this.instance_843 = new lib.シンボル1();
	this.instance_843.setTransform(11.5,120.35,1,1,0,0,180);

	this.instance_844 = new lib.シンボル1();
	this.instance_844.setTransform(42.5,155.55);

	this.instance_845 = new lib.シンボル1();
	this.instance_845.setTransform(24,142.05);

	this.instance_846 = new lib.シンボル1();
	this.instance_846.setTransform(106,133.85,1,1,0,0,180);

	this.instance_847 = new lib.シンボル1();
	this.instance_847.setTransform(124.5,120.35,1,1,0,0,180);

	this.instance_848 = new lib.シンボル1();
	this.instance_848.setTransform(255,250.75);

	this.instance_849 = new lib.シンボル1();
	this.instance_849.setTransform(236.5,237.25);

	this.instance_850 = new lib.シンボル1();
	this.instance_850.setTransform(50.5,190.55);

	this.instance_851 = new lib.シンボル1();
	this.instance_851.setTransform(32,177.05);

	this.instance_852 = new lib.シンボル1();
	this.instance_852.setTransform(142,250.75);

	this.instance_853 = new lib.シンボル1();
	this.instance_853.setTransform(123.5,237.25);

	this.instance_854 = new lib.シンボル1();
	this.instance_854.setTransform(6.5,229.05,1,1,0,0,180);

	this.instance_855 = new lib.シンボル1();
	this.instance_855.setTransform(25,215.55,1,1,0,0,180);

	this.instance_856 = new lib.シンボル1();
	this.instance_856.setTransform(118.5,215.75);

	this.instance_857 = new lib.シンボル1();
	this.instance_857.setTransform(100,202.25);

	this.instance_858 = new lib.シンボル1();
	this.instance_858.setTransform(30,194.05,1,1,0,0,180);

	this.instance_859 = new lib.シンボル1();
	this.instance_859.setTransform(48.5,180.55,1,1,0,0,180);

	this.instance_860 = new lib.シンボル1();
	this.instance_860.setTransform(5.5,215.75);

	this.instance_861 = new lib.シンボル1();
	this.instance_861.setTransform(-13,202.25);

	this.instance_862 = new lib.シンボル1();
	this.instance_862.setTransform(143,194.05,1,1,0,0,180);

	this.instance_863 = new lib.シンボル1();
	this.instance_863.setTransform(161.5,180.55,1,1,0,0,180);

	this.instance_864 = new lib.シンボル1();
	this.instance_864.setTransform(397,150.55);

	this.instance_865 = new lib.シンボル1();
	this.instance_865.setTransform(378.5,137.05);

	this.instance_866 = new lib.シンボル1();
	this.instance_866.setTransform(192.5,90.35);

	this.instance_867 = new lib.シンボル1();
	this.instance_867.setTransform(174,76.85);

	this.instance_868 = new lib.シンボル1();
	this.instance_868.setTransform(284,150.55);

	this.instance_869 = new lib.シンボル1();
	this.instance_869.setTransform(265.5,137.05);

	this.instance_870 = new lib.シンボル1();
	this.instance_870.setTransform(79.5,90.35);

	this.instance_871 = new lib.シンボル1();
	this.instance_871.setTransform(61,76.85);

	this.instance_872 = new lib.シンボル1();
	this.instance_872.setTransform(260.5,115.55);

	this.instance_873 = new lib.シンボル1();
	this.instance_873.setTransform(242,102.05);

	this.instance_874 = new lib.シンボル1();
	this.instance_874.setTransform(56,55.35);

	this.instance_875 = new lib.シンボル1();
	this.instance_875.setTransform(37.5,41.85);

	this.instance_876 = new lib.シンボル1();
	this.instance_876.setTransform(147.5,115.55);

	this.instance_877 = new lib.シンボル1();
	this.instance_877.setTransform(129,102.05);

	this.instance_878 = new lib.シンボル1();
	this.instance_878.setTransform(1,93.85,1,1,0,0,180);

	this.instance_879 = new lib.シンボル1();
	this.instance_879.setTransform(19.5,80.35,1,1,0,0,180);

	this.instance_880 = new lib.シンボル1();
	this.instance_880.setTransform(360,210.75);

	this.instance_881 = new lib.シンボル1();
	this.instance_881.setTransform(341.5,197.25);

	this.instance_882 = new lib.シンボル1();
	this.instance_882.setTransform(155.5,150.55);

	this.instance_883 = new lib.シンボル1();
	this.instance_883.setTransform(137,137.05);

	this.instance_884 = new lib.シンボル1();
	this.instance_884.setTransform(247,210.75);

	this.instance_885 = new lib.シンボル1();
	this.instance_885.setTransform(228.5,197.25);

	this.instance_886 = new lib.シンボル1();
	this.instance_886.setTransform(42.5,150.55);

	this.instance_887 = new lib.シンボル1();
	this.instance_887.setTransform(24,137.05);

	this.instance_888 = new lib.シンボル1();
	this.instance_888.setTransform(223.5,175.75);

	this.instance_889 = new lib.シンボル1();
	this.instance_889.setTransform(205,162.25);

	this.instance_890 = new lib.シンボル1();
	this.instance_890.setTransform(19,115.55);

	this.instance_891 = new lib.シンボル1();
	this.instance_891.setTransform(0.5,102.05);

	this.instance_892 = new lib.シンボル1();
	this.instance_892.setTransform(110.5,175.75);

	this.instance_893 = new lib.シンボル1();
	this.instance_893.setTransform(92,162.25);

	this.instance_894 = new lib.シンボル1();
	this.instance_894.setTransform(38,154.05,1,1,0,0,180);

	this.instance_895 = new lib.シンボル1();
	this.instance_895.setTransform(56.5,140.55,1,1,0,0,180);

	this.instance_896 = new lib.シンボル1();
	this.instance_896.setTransform(475.5,154.05);

	this.instance_897 = new lib.シンボル1();
	this.instance_897.setTransform(457,140.55);

	this.instance_898 = new lib.シンボル1();
	this.instance_898.setTransform(271,93.85);

	this.instance_899 = new lib.シンボル1();
	this.instance_899.setTransform(252.5,80.35);

	this.instance_900 = new lib.シンボル1();
	this.instance_900.setTransform(362.5,154.05);

	this.instance_901 = new lib.シンボル1();
	this.instance_901.setTransform(344,140.55);

	this.instance_902 = new lib.シンボル1();
	this.instance_902.setTransform(158,93.85);

	this.instance_903 = new lib.シンボル1();
	this.instance_903.setTransform(139.5,80.35);

	this.instance_904 = new lib.シンボル1();
	this.instance_904.setTransform(339,119.05);

	this.instance_905 = new lib.シンボル1();
	this.instance_905.setTransform(320.5,105.55);

	this.instance_906 = new lib.シンボル1();
	this.instance_906.setTransform(134.5,58.85);

	this.instance_907 = new lib.シンボル1();
	this.instance_907.setTransform(116,45.35);

	this.instance_908 = new lib.シンボル1();
	this.instance_908.setTransform(226,119.05);

	this.instance_909 = new lib.シンボル1();
	this.instance_909.setTransform(207.5,105.55);

	this.instance_910 = new lib.シンボル1();
	this.instance_910.setTransform(21.5,58.85);

	this.instance_911 = new lib.シンボル1();
	this.instance_911.setTransform(3,45.35);

	this.instance_912 = new lib.シンボル1();
	this.instance_912.setTransform(438.5,214.25);

	this.instance_913 = new lib.シンボル1();
	this.instance_913.setTransform(420,200.75);

	this.instance_914 = new lib.シンボル1();
	this.instance_914.setTransform(234,154.05);

	this.instance_915 = new lib.シンボル1();
	this.instance_915.setTransform(215.5,140.55);

	this.instance_916 = new lib.シンボル1();
	this.instance_916.setTransform(325.5,214.25);

	this.instance_917 = new lib.シンボル1();
	this.instance_917.setTransform(307,200.75);

	this.instance_918 = new lib.シンボル1();
	this.instance_918.setTransform(121,154.05);

	this.instance_919 = new lib.シンボル1();
	this.instance_919.setTransform(102.5,140.55);

	this.instance_920 = new lib.シンボル1();
	this.instance_920.setTransform(302,179.25);

	this.instance_921 = new lib.シンボル1();
	this.instance_921.setTransform(283.5,165.75);

	this.instance_922 = new lib.シンボル1();
	this.instance_922.setTransform(97.5,119.05);

	this.instance_923 = new lib.シンボル1();
	this.instance_923.setTransform(79,105.55);

	this.instance_924 = new lib.シンボル1();
	this.instance_924.setTransform(189,179.25);

	this.instance_925 = new lib.シンボル1();
	this.instance_925.setTransform(170.5,165.75);

	this.instance_926 = new lib.シンボル1();
	this.instance_926.setTransform(-15.5,119.05);

	this.instance_927 = new lib.シンボル1();
	this.instance_927.setTransform(-22,144.05,1,1,0,0,180);

	this.instance_928 = new lib.シンボル1();
	this.instance_928.setTransform(423.5,100.55);

	this.instance_929 = new lib.シンボル1();
	this.instance_929.setTransform(405,87.05);

	this.instance_930 = new lib.シンボル1();
	this.instance_930.setTransform(376,53.85);

	this.instance_931 = new lib.シンボル1();
	this.instance_931.setTransform(357.5,40.35);

	this.instance_932 = new lib.シンボル1();
	this.instance_932.setTransform(467.5,114.05);

	this.instance_933 = new lib.シンボル1();
	this.instance_933.setTransform(449,100.55);

	this.instance_934 = new lib.シンボル1();
	this.instance_934.setTransform(263,53.85);

	this.instance_935 = new lib.シンボル1();
	this.instance_935.setTransform(244.5,40.35);

	this.instance_936 = new lib.シンボル1();
	this.instance_936.setTransform(444,79.05);

	this.instance_937 = new lib.シンボル1();
	this.instance_937.setTransform(425.5,65.55);

	this.instance_938 = new lib.シンボル1();
	this.instance_938.setTransform(239.5,18.85);

	this.instance_939 = new lib.シンボル1();
	this.instance_939.setTransform(221,5.35);

	this.instance_940 = new lib.シンボル1();
	this.instance_940.setTransform(331,79.05);

	this.instance_941 = new lib.シンボル1();
	this.instance_941.setTransform(312.5,65.55);

	this.instance_942 = new lib.シンボル1();
	this.instance_942.setTransform(126.5,18.85);

	this.instance_943 = new lib.シンボル1();
	this.instance_943.setTransform(108,5.35);

	this.instance_944 = new lib.シンボル1();
	this.instance_944.setTransform(386.5,160.75);

	this.instance_945 = new lib.シンボル1();
	this.instance_945.setTransform(368,147.25);

	this.instance_946 = new lib.シンボル1();
	this.instance_946.setTransform(339,114.05);

	this.instance_947 = new lib.シンボル1();
	this.instance_947.setTransform(320.5,100.55);

	this.instance_948 = new lib.シンボル1();
	this.instance_948.setTransform(430.5,174.25);

	this.instance_949 = new lib.シンボル1();
	this.instance_949.setTransform(412,160.75);

	this.instance_950 = new lib.シンボル1();
	this.instance_950.setTransform(226,114.05);

	this.instance_951 = new lib.シンボル1();
	this.instance_951.setTransform(207.5,100.55);

	this.instance_952 = new lib.シンボル1();
	this.instance_952.setTransform(407,139.25);

	this.instance_953 = new lib.シンボル1();
	this.instance_953.setTransform(388.5,125.75);

	this.instance_954 = new lib.シンボル1();
	this.instance_954.setTransform(202.5,79.05);

	this.instance_955 = new lib.シンボル1();
	this.instance_955.setTransform(184,65.55);

	this.instance_956 = new lib.シンボル1();
	this.instance_956.setTransform(294,139.25);

	this.instance_957 = new lib.シンボル1();
	this.instance_957.setTransform(275.5,125.75);

	this.instance_958 = new lib.シンボル1();
	this.instance_958.setTransform(89.5,79.05);

	this.instance_959 = new lib.シンボル1();
	this.instance_959.setTransform(71,65.55);

	this.instance_960 = new lib.シンボル1();
	this.instance_960.setTransform(380,167.55);

	this.instance_961 = new lib.シンボル1();
	this.instance_961.setTransform(361.5,154.05);

	this.instance_962 = new lib.シンボル1();
	this.instance_962.setTransform(175.5,107.35);

	this.instance_963 = new lib.シンボル1();
	this.instance_963.setTransform(157,93.85);

	this.instance_964 = new lib.シンボル1();
	this.instance_964.setTransform(267,167.55);

	this.instance_965 = new lib.シンボル1();
	this.instance_965.setTransform(248.5,154.05);

	this.instance_966 = new lib.シンボル1();
	this.instance_966.setTransform(62.5,107.35);

	this.instance_967 = new lib.シンボル1();
	this.instance_967.setTransform(44,93.85);

	this.instance_968 = new lib.シンボル1();
	this.instance_968.setTransform(243.5,132.55);

	this.instance_969 = new lib.シンボル1();
	this.instance_969.setTransform(225,119.05);

	this.instance_970 = new lib.シンボル1();
	this.instance_970.setTransform(39,72.35);

	this.instance_971 = new lib.シンボル1();
	this.instance_971.setTransform(20.5,58.85);

	this.instance_972 = new lib.シンボル1();
	this.instance_972.setTransform(130.5,132.55);

	this.instance_973 = new lib.シンボル1();
	this.instance_973.setTransform(112,119.05);

	this.instance_974 = new lib.シンボル1();
	this.instance_974.setTransform(18,110.85,1,1,0,0,180);

	this.instance_975 = new lib.シンボル1();
	this.instance_975.setTransform(36.5,97.35,1,1,0,0,180);

	this.instance_976 = new lib.シンボル1();
	this.instance_976.setTransform(343,227.75);

	this.instance_977 = new lib.シンボル1();
	this.instance_977.setTransform(324.5,214.25);

	this.instance_978 = new lib.シンボル1();
	this.instance_978.setTransform(138.5,167.55);

	this.instance_979 = new lib.シンボル1();
	this.instance_979.setTransform(120,154.05);

	this.instance_980 = new lib.シンボル1();
	this.instance_980.setTransform(230,227.75);

	this.instance_981 = new lib.シンボル1();
	this.instance_981.setTransform(211.5,214.25);

	this.instance_982 = new lib.シンボル1();
	this.instance_982.setTransform(25.5,167.55);

	this.instance_983 = new lib.シンボル1();
	this.instance_983.setTransform(7,154.05);

	this.instance_984 = new lib.シンボル1();
	this.instance_984.setTransform(206.5,192.75);

	this.instance_985 = new lib.シンボル1();
	this.instance_985.setTransform(188,179.25);

	this.instance_986 = new lib.シンボル1();
	this.instance_986.setTransform(2,132.55);

	this.instance_987 = new lib.シンボル1();
	this.instance_987.setTransform(-16.5,119.05);

	this.instance_988 = new lib.シンボル1();
	this.instance_988.setTransform(93.5,192.75);

	this.instance_989 = new lib.シンボル1();
	this.instance_989.setTransform(75,179.25);

	this.instance_990 = new lib.シンボル1();
	this.instance_990.setTransform(55,171.05,1,1,0,0,180);

	this.instance_991 = new lib.シンボル1();
	this.instance_991.setTransform(73.5,157.55,1,1,0,0,180);

	this.instance_992 = new lib.シンボル1();
	this.instance_992.setTransform(485,127.55);

	this.instance_993 = new lib.シンボル1();
	this.instance_993.setTransform(466.5,114.05);

	this.instance_994 = new lib.シンボル1();
	this.instance_994.setTransform(280.5,67.35);

	this.instance_995 = new lib.シンボル1();
	this.instance_995.setTransform(262,53.85);

	this.instance_996 = new lib.シンボル1();
	this.instance_996.setTransform(372,127.55);

	this.instance_997 = new lib.シンボル1();
	this.instance_997.setTransform(353.5,114.05);

	this.instance_998 = new lib.シンボル1();
	this.instance_998.setTransform(167.5,67.35);

	this.instance_999 = new lib.シンボル1();
	this.instance_999.setTransform(149,53.85);

	this.instance_1000 = new lib.シンボル1();
	this.instance_1000.setTransform(348.5,92.55);

	this.instance_1001 = new lib.シンボル1();
	this.instance_1001.setTransform(330,79.05);

	this.instance_1002 = new lib.シンボル1();
	this.instance_1002.setTransform(144,32.35);

	this.instance_1003 = new lib.シンボル1();
	this.instance_1003.setTransform(125.5,18.85);

	this.instance_1004 = new lib.シンボル1();
	this.instance_1004.setTransform(235.5,92.55);

	this.instance_1005 = new lib.シンボル1();
	this.instance_1005.setTransform(217,79.05);

	this.instance_1006 = new lib.シンボル1();
	this.instance_1006.setTransform(31,32.35);

	this.instance_1007 = new lib.シンボル1();
	this.instance_1007.setTransform(12.5,18.85);

	this.instance_1008 = new lib.シンボル1();
	this.instance_1008.setTransform(448,187.75);

	this.instance_1009 = new lib.シンボル1();
	this.instance_1009.setTransform(429.5,174.25);

	this.instance_1010 = new lib.シンボル1();
	this.instance_1010.setTransform(243.5,127.55);

	this.instance_1011 = new lib.シンボル1();
	this.instance_1011.setTransform(225,114.05);

	this.instance_1012 = new lib.シンボル1();
	this.instance_1012.setTransform(335,187.75);

	this.instance_1013 = new lib.シンボル1();
	this.instance_1013.setTransform(316.5,174.25);

	this.instance_1014 = new lib.シンボル1();
	this.instance_1014.setTransform(130.5,127.55);

	this.instance_1015 = new lib.シンボル1();
	this.instance_1015.setTransform(112,114.05);

	this.instance_1016 = new lib.シンボル1();
	this.instance_1016.setTransform(311.5,152.75);

	this.instance_1017 = new lib.シンボル1();
	this.instance_1017.setTransform(293,139.25);

	this.instance_1018 = new lib.シンボル1();
	this.instance_1018.setTransform(107,92.55);

	this.instance_1019 = new lib.シンボル1();
	this.instance_1019.setTransform(88.5,79.05);

	this.instance_1020 = new lib.シンボル1();
	this.instance_1020.setTransform(198.5,152.75);

	this.instance_1021 = new lib.シンボル1();
	this.instance_1021.setTransform(180,139.25);

	this.instance_1022 = new lib.シンボル1();
	this.instance_1022.setTransform(-6,92.55);

	this.instance_1023 = new lib.シンボル1();
	this.instance_1023.setTransform(-24.5,79.05);

	this.instance_1024 = new lib.シンボル1();
	this.instance_1024.setTransform(459,146.55);

	this.instance_1025 = new lib.シンボル1();
	this.instance_1025.setTransform(440.5,133.05);

	this.instance_1026 = new lib.シンボル1();
	this.instance_1026.setTransform(254.5,86.35);

	this.instance_1027 = new lib.シンボル1();
	this.instance_1027.setTransform(236,72.85);

	this.instance_1028 = new lib.シンボル1();
	this.instance_1028.setTransform(346,146.55);

	this.instance_1029 = new lib.シンボル1();
	this.instance_1029.setTransform(327.5,133.05);

	this.instance_1030 = new lib.シンボル1();
	this.instance_1030.setTransform(141.5,86.35);

	this.instance_1031 = new lib.シンボル1();
	this.instance_1031.setTransform(123,72.85);

	this.instance_1032 = new lib.シンボル1();
	this.instance_1032.setTransform(322.5,111.55);

	this.instance_1033 = new lib.シンボル1();
	this.instance_1033.setTransform(304,98.05);

	this.instance_1034 = new lib.シンボル1();
	this.instance_1034.setTransform(118,51.35);

	this.instance_1035 = new lib.シンボル1();
	this.instance_1035.setTransform(99.5,37.85);

	this.instance_1036 = new lib.シンボル1();
	this.instance_1036.setTransform(209.5,111.55);

	this.instance_1037 = new lib.シンボル1();
	this.instance_1037.setTransform(191,98.05);

	this.instance_1038 = new lib.シンボル1();
	this.instance_1038.setTransform(5,51.35);

	this.instance_1039 = new lib.シンボル1();
	this.instance_1039.setTransform(-13.5,37.85);

	this.instance_1040 = new lib.シンボル1();
	this.instance_1040.setTransform(422,206.75);

	this.instance_1041 = new lib.シンボル1();
	this.instance_1041.setTransform(403.5,193.25);

	this.instance_1042 = new lib.シンボル1();
	this.instance_1042.setTransform(217.5,146.55);

	this.instance_1043 = new lib.シンボル1();
	this.instance_1043.setTransform(199,133.05);

	this.instance_1044 = new lib.シンボル1();
	this.instance_1044.setTransform(309,206.75);

	this.instance_1045 = new lib.シンボル1();
	this.instance_1045.setTransform(290.5,193.25);

	this.instance_1046 = new lib.シンボル1();
	this.instance_1046.setTransform(104.5,146.55);

	this.instance_1047 = new lib.シンボル1();
	this.instance_1047.setTransform(86,133.05);

	this.instance_1048 = new lib.シンボル1();
	this.instance_1048.setTransform(285.5,171.75);

	this.instance_1049 = new lib.シンボル1();
	this.instance_1049.setTransform(267,158.25);

	this.instance_1050 = new lib.シンボル1();
	this.instance_1050.setTransform(81,111.55);

	this.instance_1051 = new lib.シンボル1();
	this.instance_1051.setTransform(62.5,98.05);

	this.instance_1052 = new lib.シンボル1();
	this.instance_1052.setTransform(172.5,171.75);

	this.instance_1053 = new lib.シンボル1();
	this.instance_1053.setTransform(154,158.25);

	this.instance_1054 = new lib.シンボル1();
	this.instance_1054.setTransform(-21,150.05,1,1,0,0,180);

	this.instance_1055 = new lib.シンボル1();
	this.instance_1055.setTransform(-2.5,136.55,1,1,0,0,180);

	this.instance_1056 = new lib.シンボル1();
	this.instance_1056.setTransform(407,93.05);

	this.instance_1057 = new lib.シンボル1();
	this.instance_1057.setTransform(388.5,79.55);

	this.instance_1058 = new lib.シンボル1();
	this.instance_1058.setTransform(359.5,46.35);

	this.instance_1059 = new lib.シンボル1();
	this.instance_1059.setTransform(341,32.85);

	this.instance_1060 = new lib.シンボル1();
	this.instance_1060.setTransform(451,106.55);

	this.instance_1061 = new lib.シンボル1();
	this.instance_1061.setTransform(432.5,93.05);

	this.instance_1062 = new lib.シンボル1();
	this.instance_1062.setTransform(246.5,46.35);

	this.instance_1063 = new lib.シンボル1();
	this.instance_1063.setTransform(228,32.85);

	this.instance_1064 = new lib.シンボル1();
	this.instance_1064.setTransform(427.5,71.55);

	this.instance_1065 = new lib.シンボル1();
	this.instance_1065.setTransform(409,58.05);

	this.instance_1066 = new lib.シンボル1();
	this.instance_1066.setTransform(223,11.35);

	this.instance_1067 = new lib.シンボル1();
	this.instance_1067.setTransform(204.5,-2.15);

	this.instance_1068 = new lib.シンボル1();
	this.instance_1068.setTransform(314.5,71.55);

	this.instance_1069 = new lib.シンボル1();
	this.instance_1069.setTransform(296,58.05);

	this.instance_1070 = new lib.シンボル1();
	this.instance_1070.setTransform(110,11.35);

	this.instance_1071 = new lib.シンボル1();
	this.instance_1071.setTransform(91.5,-2.15);

	this.instance_1072 = new lib.シンボル1();
	this.instance_1072.setTransform(370,153.25);

	this.instance_1073 = new lib.シンボル1();
	this.instance_1073.setTransform(351.5,139.75);

	this.instance_1074 = new lib.シンボル1();
	this.instance_1074.setTransform(322.5,106.55);

	this.instance_1075 = new lib.シンボル1();
	this.instance_1075.setTransform(304,93.05);

	this.instance_1076 = new lib.シンボル1();
	this.instance_1076.setTransform(414,166.75);

	this.instance_1077 = new lib.シンボル1();
	this.instance_1077.setTransform(395.5,153.25);

	this.instance_1078 = new lib.シンボル1();
	this.instance_1078.setTransform(209.5,106.55);

	this.instance_1079 = new lib.シンボル1();
	this.instance_1079.setTransform(191,93.05);

	this.instance_1080 = new lib.シンボル1();
	this.instance_1080.setTransform(390.5,131.75);

	this.instance_1081 = new lib.シンボル1();
	this.instance_1081.setTransform(372,118.25);

	this.instance_1082 = new lib.シンボル1();
	this.instance_1082.setTransform(186,71.55);

	this.instance_1083 = new lib.シンボル1();
	this.instance_1083.setTransform(167.5,58.05);

	this.instance_1084 = new lib.シンボル1();
	this.instance_1084.setTransform(277.5,131.75);

	this.instance_1085 = new lib.シンボル1();
	this.instance_1085.setTransform(259,118.25);

	this.instance_1086 = new lib.シンボル1();
	this.instance_1086.setTransform(73,71.55);

	this.instance_1087 = new lib.シンボル1();
	this.instance_1087.setTransform(54.5,58.05);

	this.instance_1088 = new lib.シンボル1();
	this.instance_1088.setTransform(363.5,160.05);

	this.instance_1089 = new lib.シンボル1();
	this.instance_1089.setTransform(345,146.55);

	this.instance_1090 = new lib.シンボル1();
	this.instance_1090.setTransform(159,99.85);

	this.instance_1091 = new lib.シンボル1();
	this.instance_1091.setTransform(140.5,86.35);

	this.instance_1092 = new lib.シンボル1();
	this.instance_1092.setTransform(250.5,160.05);

	this.instance_1093 = new lib.シンボル1();
	this.instance_1093.setTransform(232,146.55);

	this.instance_1094 = new lib.シンボル1();
	this.instance_1094.setTransform(46,99.85);

	this.instance_1095 = new lib.シンボル1();
	this.instance_1095.setTransform(27.5,86.35);

	this.instance_1096 = new lib.シンボル1();
	this.instance_1096.setTransform(227,125.05);

	this.instance_1097 = new lib.シンボル1();
	this.instance_1097.setTransform(208.5,111.55);

	this.instance_1098 = new lib.シンボル1();
	this.instance_1098.setTransform(22.5,64.85);

	this.instance_1099 = new lib.シンボル1();
	this.instance_1099.setTransform(4,51.35);

	this.instance_1100 = new lib.シンボル1();
	this.instance_1100.setTransform(114,125.05);

	this.instance_1101 = new lib.シンボル1();
	this.instance_1101.setTransform(95.5,111.55);

	this.instance_1102 = new lib.シンボル1();
	this.instance_1102.setTransform(37.5,103.35,1,1,0,0,180);

	this.instance_1103 = new lib.シンボル1();
	this.instance_1103.setTransform(56,89.85,1,1,0,0,180);

	this.instance_1104 = new lib.シンボル1();
	this.instance_1104.setTransform(326.5,220.25);

	this.instance_1105 = new lib.シンボル1();
	this.instance_1105.setTransform(308,206.75);

	this.instance_1106 = new lib.シンボル1();
	this.instance_1106.setTransform(122,160.05);

	this.instance_1107 = new lib.シンボル1();
	this.instance_1107.setTransform(103.5,146.55);

	this.instance_1108 = new lib.シンボル1();
	this.instance_1108.setTransform(213.5,220.25);

	this.instance_1109 = new lib.シンボル1();
	this.instance_1109.setTransform(195,206.75);

	this.instance_1110 = new lib.シンボル1();
	this.instance_1110.setTransform(9,160.05);

	this.instance_1111 = new lib.シンボル1();
	this.instance_1111.setTransform(-9.5,146.55);

	this.instance_1112 = new lib.シンボル1();
	this.instance_1112.setTransform(190,185.25);

	this.instance_1113 = new lib.シンボル1();
	this.instance_1113.setTransform(171.5,171.75);

	this.instance_1114 = new lib.シンボル1();
	this.instance_1114.setTransform(-14.5,125.05);

	this.instance_1115 = new lib.シンボル1();
	this.instance_1115.setTransform(-20,150.05,1,1,0,0,180);

	this.instance_1116 = new lib.シンボル1();
	this.instance_1116.setTransform(77,185.25);

	this.instance_1117 = new lib.シンボル1();
	this.instance_1117.setTransform(58.5,171.75);

	this.instance_1118 = new lib.シンボル1();
	this.instance_1118.setTransform(74.5,163.55,1,1,0,0,180);

	this.instance_1119 = new lib.シンボル1();
	this.instance_1119.setTransform(93,150.05,1,1,0,0,180);

	this.instance_1120 = new lib.シンボル1();
	this.instance_1120.setTransform(468.5,120.05);

	this.instance_1121 = new lib.シンボル1();
	this.instance_1121.setTransform(450,106.55);

	this.instance_1122 = new lib.シンボル1();
	this.instance_1122.setTransform(264,59.85);

	this.instance_1123 = new lib.シンボル1();
	this.instance_1123.setTransform(245.5,46.35);

	this.instance_1124 = new lib.シンボル1();
	this.instance_1124.setTransform(355.5,120.05);

	this.instance_1125 = new lib.シンボル1();
	this.instance_1125.setTransform(337,106.55);

	this.instance_1126 = new lib.シンボル1();
	this.instance_1126.setTransform(151,59.85);

	this.instance_1127 = new lib.シンボル1();
	this.instance_1127.setTransform(132.5,46.35);

	this.instance_1128 = new lib.シンボル1();
	this.instance_1128.setTransform(332,85.05);

	this.instance_1129 = new lib.シンボル1();
	this.instance_1129.setTransform(313.5,71.55);

	this.instance_1130 = new lib.シンボル1();
	this.instance_1130.setTransform(127.5,24.85);

	this.instance_1131 = new lib.シンボル1();
	this.instance_1131.setTransform(109,11.35);

	this.instance_1132 = new lib.シンボル1();
	this.instance_1132.setTransform(219,85.05);

	this.instance_1133 = new lib.シンボル1();
	this.instance_1133.setTransform(200.5,71.55);

	this.instance_1134 = new lib.シンボル1();
	this.instance_1134.setTransform(14.5,24.85);

	this.instance_1135 = new lib.シンボル1();
	this.instance_1135.setTransform(-4,11.35);

	this.instance_1136 = new lib.シンボル1();
	this.instance_1136.setTransform(431.5,180.25);

	this.instance_1137 = new lib.シンボル1();
	this.instance_1137.setTransform(413,166.75);

	this.instance_1138 = new lib.シンボル1();
	this.instance_1138.setTransform(227,120.05);

	this.instance_1139 = new lib.シンボル1();
	this.instance_1139.setTransform(208.5,106.55);

	this.instance_1140 = new lib.シンボル1();
	this.instance_1140.setTransform(318.5,180.25);

	this.instance_1141 = new lib.シンボル1();
	this.instance_1141.setTransform(300,166.75);

	this.instance_1142 = new lib.シンボル1();
	this.instance_1142.setTransform(114,120.05);

	this.instance_1143 = new lib.シンボル1();
	this.instance_1143.setTransform(95.5,106.55);

	this.instance_1144 = new lib.シンボル1();
	this.instance_1144.setTransform(295,145.25);

	this.instance_1145 = new lib.シンボル1();
	this.instance_1145.setTransform(276.5,131.75);

	this.instance_1146 = new lib.シンボル1();
	this.instance_1146.setTransform(90.5,85.05);

	this.instance_1147 = new lib.シンボル1();
	this.instance_1147.setTransform(72,71.55);

	this.instance_1148 = new lib.シンボル1();
	this.instance_1148.setTransform(182,145.25);

	this.instance_1149 = new lib.シンボル1();
	this.instance_1149.setTransform(163.5,131.75);

	this.instance_1150 = new lib.シンボル1();
	this.instance_1150.setTransform(-22.5,85.05);

	this.instance_1151 = new lib.シンボル1();
	this.instance_1151.setTransform(-12,110.05,1,1,0,0,180);

	this.instance_1152 = new lib.シンボル1();
	this.instance_1152.setTransform(390,110.05);

	this.instance_1153 = new lib.シンボル1();
	this.instance_1153.setTransform(371.5,96.55);

	this.instance_1154 = new lib.シンボル1();
	this.instance_1154.setTransform(342.5,63.35);

	this.instance_1155 = new lib.シンボル1();
	this.instance_1155.setTransform(324,49.85);

	this.instance_1156 = new lib.シンボル1();
	this.instance_1156.setTransform(434,123.55);

	this.instance_1157 = new lib.シンボル1();
	this.instance_1157.setTransform(415.5,110.05);

	this.instance_1158 = new lib.シンボル1();
	this.instance_1158.setTransform(229.5,63.35);

	this.instance_1159 = new lib.シンボル1();
	this.instance_1159.setTransform(211,49.85);

	this.instance_1160 = new lib.シンボル1();
	this.instance_1160.setTransform(410.5,88.55);

	this.instance_1161 = new lib.シンボル1();
	this.instance_1161.setTransform(392,75.05);

	this.instance_1162 = new lib.シンボル1();
	this.instance_1162.setTransform(206,28.35);

	this.instance_1163 = new lib.シンボル1();
	this.instance_1163.setTransform(187.5,14.85);

	this.instance_1164 = new lib.シンボル1();
	this.instance_1164.setTransform(297.5,88.55);

	this.instance_1165 = new lib.シンボル1();
	this.instance_1165.setTransform(279,75.05);

	this.instance_1166 = new lib.シンボル1();
	this.instance_1166.setTransform(93,28.35);

	this.instance_1167 = new lib.シンボル1();
	this.instance_1167.setTransform(74.5,14.85);

	this.instance_1168 = new lib.シンボル1();
	this.instance_1168.setTransform(353,170.25);

	this.instance_1169 = new lib.シンボル1();
	this.instance_1169.setTransform(491.5,170.25);

	this.instance_1170 = new lib.シンボル1();
	this.instance_1170.setTransform(305.5,123.55);

	this.instance_1171 = new lib.シンボル1();
	this.instance_1171.setTransform(287,110.05);

	this.instance_1172 = new lib.シンボル1();
	this.instance_1172.setTransform(397,183.75);

	this.instance_1173 = new lib.シンボル1();
	this.instance_1173.setTransform(378.5,170.25);

	this.instance_1174 = new lib.シンボル1();
	this.instance_1174.setTransform(192.5,123.55);

	this.instance_1175 = new lib.シンボル1();
	this.instance_1175.setTransform(174,110.05);

	this.instance_1176 = new lib.シンボル1();
	this.instance_1176.setTransform(373.5,148.75);

	this.instance_1177 = new lib.シンボル1();
	this.instance_1177.setTransform(355,135.25);

	this.instance_1178 = new lib.シンボル1();
	this.instance_1178.setTransform(169,88.55);

	this.instance_1179 = new lib.シンボル1();
	this.instance_1179.setTransform(150.5,75.05);

	this.instance_1180 = new lib.シンボル1();
	this.instance_1180.setTransform(260.5,148.75);

	this.instance_1181 = new lib.シンボル1();
	this.instance_1181.setTransform(242,135.25);

	this.instance_1182 = new lib.シンボル1();
	this.instance_1182.setTransform(56,88.55);

	this.instance_1183 = new lib.シンボル1();
	this.instance_1183.setTransform(37.5,75.05);

	this.instance_1184 = new lib.シンボル1();
	this.instance_1184.setTransform(495,70.05);

	this.instance_1185 = new lib.シンボル1();
	this.instance_1185.setTransform(476.5,56.55);

	this.instance_1186 = new lib.シンボル1();
	this.instance_1186.setTransform(447.5,23.35);

	this.instance_1187 = new lib.シンボル1();
	this.instance_1187.setTransform(429,9.85);

	this.instance_1188 = new lib.シンボル1();
	this.instance_1188.setTransform(382,70.05);

	this.instance_1189 = new lib.シンボル1();
	this.instance_1189.setTransform(363.5,56.55);

	this.instance_1190 = new lib.シンボル1();
	this.instance_1190.setTransform(334.5,23.35);

	this.instance_1191 = new lib.シンボル1();
	this.instance_1191.setTransform(316,9.85);

	this.instance_1192 = new lib.シンボル1();
	this.instance_1192.setTransform(358.5,35.05);

	this.instance_1193 = new lib.シンボル1();
	this.instance_1193.setTransform(340,21.55);

	this.instance_1194 = new lib.シンボル1();
	this.instance_1194.setTransform(311,-11.65);

	this.instance_1195 = new lib.シンボル1();
	this.instance_1195.setTransform(292.5,-25.15);

	this.instance_1196 = new lib.シンボル1();
	this.instance_1196.setTransform(402.5,48.55);

	this.instance_1197 = new lib.シンボル1();
	this.instance_1197.setTransform(384,35.05);

	this.instance_1198 = new lib.シンボル1();
	this.instance_1198.setTransform(198,-11.65);

	this.instance_1199 = new lib.シンボル1();
	this.instance_1199.setTransform(179.5,-25.15);

	this.instance_1200 = new lib.シンボル1();
	this.instance_1200.setTransform(458,130.25);

	this.instance_1201 = new lib.シンボル1();
	this.instance_1201.setTransform(439.5,116.75);

	this.instance_1202 = new lib.シンボル1();
	this.instance_1202.setTransform(410.5,83.55);

	this.instance_1203 = new lib.シンボル1();
	this.instance_1203.setTransform(392,70.05);

	this.instance_1204 = new lib.シンボル1();
	this.instance_1204.setTransform(345,130.25);

	this.instance_1205 = new lib.シンボル1();
	this.instance_1205.setTransform(483.5,130.25);

	this.instance_1206 = new lib.シンボル1();
	this.instance_1206.setTransform(297.5,83.55);

	this.instance_1207 = new lib.シンボル1();
	this.instance_1207.setTransform(279,70.05);

	this.instance_1208 = new lib.シンボル1();
	this.instance_1208.setTransform(478.5,108.75);

	this.instance_1209 = new lib.シンボル1();
	this.instance_1209.setTransform(460,95.25);

	this.instance_1210 = new lib.シンボル1();
	this.instance_1210.setTransform(274,48.55);

	this.instance_1211 = new lib.シンボル1();
	this.instance_1211.setTransform(255.5,35.05);

	this.instance_1212 = new lib.シンボル1();
	this.instance_1212.setTransform(365.5,108.75);

	this.instance_1213 = new lib.シンボル1();
	this.instance_1213.setTransform(347,95.25);

	this.instance_1214 = new lib.シンボル1();
	this.instance_1214.setTransform(161,48.55);

	this.instance_1215 = new lib.シンボル1();
	this.instance_1215.setTransform(142.5,35.05);

	this.instance_1216 = new lib.シンボル1();
	this.instance_1216.setTransform(451.5,137.05);

	this.instance_1217 = new lib.シンボル1();
	this.instance_1217.setTransform(433,123.55);

	this.instance_1218 = new lib.シンボル1();
	this.instance_1218.setTransform(247,76.85);

	this.instance_1219 = new lib.シンボル1();
	this.instance_1219.setTransform(228.5,63.35);

	this.instance_1220 = new lib.シンボル1();
	this.instance_1220.setTransform(338.5,137.05);

	this.instance_1221 = new lib.シンボル1();
	this.instance_1221.setTransform(320,123.55);

	this.instance_1222 = new lib.シンボル1();
	this.instance_1222.setTransform(134,76.85);

	this.instance_1223 = new lib.シンボル1();
	this.instance_1223.setTransform(115.5,63.35);

	this.instance_1224 = new lib.シンボル1();
	this.instance_1224.setTransform(315,102.05);

	this.instance_1225 = new lib.シンボル1();
	this.instance_1225.setTransform(296.5,88.55);

	this.instance_1226 = new lib.シンボル1();
	this.instance_1226.setTransform(110.5,41.85);

	this.instance_1227 = new lib.シンボル1();
	this.instance_1227.setTransform(92,28.35);

	this.instance_1228 = new lib.シンボル1();
	this.instance_1228.setTransform(202,102.05);

	this.instance_1229 = new lib.シンボル1();
	this.instance_1229.setTransform(183.5,88.55);

	this.instance_1230 = new lib.シンボル1();
	this.instance_1230.setTransform(-2.5,41.85);

	this.instance_1231 = new lib.シンボル1();
	this.instance_1231.setTransform(-21,28.35);

	this.instance_1232 = new lib.シンボル1();
	this.instance_1232.setTransform(414.5,197.25);

	this.instance_1233 = new lib.シンボル1();
	this.instance_1233.setTransform(396,183.75);

	this.instance_1234 = new lib.シンボル1();
	this.instance_1234.setTransform(210,137.05);

	this.instance_1235 = new lib.シンボル1();
	this.instance_1235.setTransform(191.5,123.55);

	this.instance_1236 = new lib.シンボル1();
	this.instance_1236.setTransform(301.5,197.25);

	this.instance_1237 = new lib.シンボル1();
	this.instance_1237.setTransform(283,183.75);

	this.instance_1238 = new lib.シンボル1();
	this.instance_1238.setTransform(97,137.05);

	this.instance_1239 = new lib.シンボル1();
	this.instance_1239.setTransform(78.5,123.55);

	this.instance_1240 = new lib.シンボル1();
	this.instance_1240.setTransform(278,162.25);

	this.instance_1241 = new lib.シンボル1();
	this.instance_1241.setTransform(259.5,148.75);

	this.instance_1242 = new lib.シンボル1();
	this.instance_1242.setTransform(73.5,102.05);

	this.instance_1243 = new lib.シンボル1();
	this.instance_1243.setTransform(55,88.55);

	this.instance_1244 = new lib.シンボル1();
	this.instance_1244.setTransform(165,162.25);

	this.instance_1245 = new lib.シンボル1();
	this.instance_1245.setTransform(146.5,148.75);

	this.instance_1246 = new lib.シンボル1();
	this.instance_1246.setTransform(-13.5,140.55,1,1,0,0,180);

	this.instance_1247 = new lib.シンボル1();
	this.instance_1247.setTransform(5,127.05,1,1,0,0,180);

	this.instance_1248 = new lib.シンボル1();
	this.instance_1248.setTransform(399.5,83.55);

	this.instance_1249 = new lib.シンボル1();
	this.instance_1249.setTransform(381,70.05);

	this.instance_1250 = new lib.シンボル1();
	this.instance_1250.setTransform(352,36.85);

	this.instance_1251 = new lib.シンボル1();
	this.instance_1251.setTransform(333.5,23.35);

	this.instance_1252 = new lib.シンボル1();
	this.instance_1252.setTransform(443.5,97.05);

	this.instance_1253 = new lib.シンボル1();
	this.instance_1253.setTransform(425,83.55);

	this.instance_1254 = new lib.シンボル1();
	this.instance_1254.setTransform(239,36.85);

	this.instance_1255 = new lib.シンボル1();
	this.instance_1255.setTransform(220.5,23.35);

	this.instance_1256 = new lib.シンボル1();
	this.instance_1256.setTransform(420,62.05);

	this.instance_1257 = new lib.シンボル1();
	this.instance_1257.setTransform(401.5,48.55);

	this.instance_1258 = new lib.シンボル1();
	this.instance_1258.setTransform(215.5,1.85);

	this.instance_1259 = new lib.シンボル1();
	this.instance_1259.setTransform(197,-11.65);

	this.instance_1260 = new lib.シンボル1();
	this.instance_1260.setTransform(307,62.05);

	this.instance_1261 = new lib.シンボル1();
	this.instance_1261.setTransform(288.5,48.55);

	this.instance_1262 = new lib.シンボル1();
	this.instance_1262.setTransform(102.5,1.85);

	this.instance_1263 = new lib.シンボル1();
	this.instance_1263.setTransform(84,-11.65);

	this.instance_1264 = new lib.シンボル1();
	this.instance_1264.setTransform(362.5,143.75);

	this.instance_1265 = new lib.シンボル1();
	this.instance_1265.setTransform(344,130.25);

	this.instance_1266 = new lib.シンボル1();
	this.instance_1266.setTransform(315,97.05);

	this.instance_1267 = new lib.シンボル1();
	this.instance_1267.setTransform(296.5,83.55);

	this.instance_1268 = new lib.シンボル1();
	this.instance_1268.setTransform(406.5,157.25);

	this.instance_1269 = new lib.シンボル1();
	this.instance_1269.setTransform(388,143.75);

	this.instance_1270 = new lib.シンボル1();
	this.instance_1270.setTransform(202,97.05);

	this.instance_1271 = new lib.シンボル1();
	this.instance_1271.setTransform(183.5,83.55);

	this.instance_1272 = new lib.シンボル1();
	this.instance_1272.setTransform(383,122.25);

	this.instance_1273 = new lib.シンボル1();
	this.instance_1273.setTransform(364.5,108.75);

	this.instance_1274 = new lib.シンボル1();
	this.instance_1274.setTransform(178.5,62.05);

	this.instance_1275 = new lib.シンボル1();
	this.instance_1275.setTransform(160,48.55);

	this.instance_1276 = new lib.シンボル1();
	this.instance_1276.setTransform(270,122.25);

	this.instance_1277 = new lib.シンボル1();
	this.instance_1277.setTransform(251.5,108.75);

	this.instance_1278 = new lib.シンボル1();
	this.instance_1278.setTransform(65.5,62.05);

	this.instance_1279 = new lib.シンボル1();
	this.instance_1279.setTransform(47,48.55);

	this.instance_1280 = new lib.シンボル1();
	this.instance_1280.setTransform(389,160.05);

	this.instance_1281 = new lib.シンボル1();
	this.instance_1281.setTransform(370.5,146.55);

	this.instance_1282 = new lib.シンボル1();
	this.instance_1282.setTransform(184.5,99.85);

	this.instance_1283 = new lib.シンボル1();
	this.instance_1283.setTransform(166,86.35);

	this.instance_1284 = new lib.シンボル1();
	this.instance_1284.setTransform(276,160.05);

	this.instance_1285 = new lib.シンボル1();
	this.instance_1285.setTransform(257.5,146.55);

	this.instance_1286 = new lib.シンボル1();
	this.instance_1286.setTransform(71.5,99.85);

	this.instance_1287 = new lib.シンボル1();
	this.instance_1287.setTransform(53,86.35);

	this.instance_1288 = new lib.シンボル1();
	this.instance_1288.setTransform(252.5,125.05);

	this.instance_1289 = new lib.シンボル1();
	this.instance_1289.setTransform(234,111.55);

	this.instance_1290 = new lib.シンボル1();
	this.instance_1290.setTransform(48,64.85);

	this.instance_1291 = new lib.シンボル1();
	this.instance_1291.setTransform(29.5,51.35);

	this.instance_1292 = new lib.シンボル1();
	this.instance_1292.setTransform(139.5,125.05);

	this.instance_1293 = new lib.シンボル1();
	this.instance_1293.setTransform(121,111.55);

	this.instance_1294 = new lib.シンボル1();
	this.instance_1294.setTransform(12,103.35,1,1,0,0,180);

	this.instance_1295 = new lib.シンボル1();
	this.instance_1295.setTransform(30.5,89.85,1,1,0,0,180);

	this.instance_1296 = new lib.シンボル1();
	this.instance_1296.setTransform(352,220.25);

	this.instance_1297 = new lib.シンボル1();
	this.instance_1297.setTransform(333.5,206.75);

	this.instance_1298 = new lib.シンボル1();
	this.instance_1298.setTransform(147.5,160.05);

	this.instance_1299 = new lib.シンボル1();
	this.instance_1299.setTransform(129,146.55);

	this.instance_1300 = new lib.シンボル1();
	this.instance_1300.setTransform(239,220.25);

	this.instance_1301 = new lib.シンボル1();
	this.instance_1301.setTransform(220.5,206.75);

	this.instance_1302 = new lib.シンボル1();
	this.instance_1302.setTransform(34.5,160.05);

	this.instance_1303 = new lib.シンボル1();
	this.instance_1303.setTransform(16,146.55);

	this.instance_1304 = new lib.シンボル1();
	this.instance_1304.setTransform(215.5,185.25);

	this.instance_1305 = new lib.シンボル1();
	this.instance_1305.setTransform(197,171.75);

	this.instance_1306 = new lib.シンボル1();
	this.instance_1306.setTransform(11,125.05);

	this.instance_1307 = new lib.シンボル1();
	this.instance_1307.setTransform(-7.5,111.55);

	this.instance_1308 = new lib.シンボル1();
	this.instance_1308.setTransform(102.5,185.25);

	this.instance_1309 = new lib.シンボル1();
	this.instance_1309.setTransform(84,171.75);

	this.instance_1310 = new lib.シンボル1();
	this.instance_1310.setTransform(49,163.55,1,1,0,0,180);

	this.instance_1311 = new lib.シンボル1();
	this.instance_1311.setTransform(67.5,150.05,1,1,0,0,180);

	this.instance_1312 = new lib.シンボル1();
	this.instance_1312.setTransform(337,106.55);

	this.instance_1313 = new lib.シンボル1();
	this.instance_1313.setTransform(475.5,106.55);

	this.instance_1314 = new lib.シンボル1();
	this.instance_1314.setTransform(289.5,59.85);

	this.instance_1315 = new lib.シンボル1();
	this.instance_1315.setTransform(271,46.35);

	this.instance_1316 = new lib.シンボル1();
	this.instance_1316.setTransform(381,120.05);

	this.instance_1317 = new lib.シンボル1();
	this.instance_1317.setTransform(362.5,106.55);

	this.instance_1318 = new lib.シンボル1();
	this.instance_1318.setTransform(176.5,59.85);

	this.instance_1319 = new lib.シンボル1();
	this.instance_1319.setTransform(158,46.35);

	this.instance_1320 = new lib.シンボル1();
	this.instance_1320.setTransform(357.5,85.05);

	this.instance_1321 = new lib.シンボル1();
	this.instance_1321.setTransform(339,71.55);

	this.instance_1322 = new lib.シンボル1();
	this.instance_1322.setTransform(153,24.85);

	this.instance_1323 = new lib.シンボル1();
	this.instance_1323.setTransform(134.5,11.35);

	this.instance_1324 = new lib.シンボル1();
	this.instance_1324.setTransform(244.5,85.05);

	this.instance_1325 = new lib.シンボル1();
	this.instance_1325.setTransform(226,71.55);

	this.instance_1326 = new lib.シンボル1();
	this.instance_1326.setTransform(40,24.85);

	this.instance_1327 = new lib.シンボル1();
	this.instance_1327.setTransform(21.5,11.35);

	this.instance_1328 = new lib.シンボル1();
	this.instance_1328.setTransform(457,180.25);

	this.instance_1329 = new lib.シンボル1();
	this.instance_1329.setTransform(438.5,166.75);

	this.instance_1330 = new lib.シンボル1();
	this.instance_1330.setTransform(252.5,120.05);

	this.instance_1331 = new lib.シンボル1();
	this.instance_1331.setTransform(234,106.55);

	this.instance_1332 = new lib.シンボル1();
	this.instance_1332.setTransform(344,180.25);

	this.instance_1333 = new lib.シンボル1();
	this.instance_1333.setTransform(325.5,166.75);

	this.instance_1334 = new lib.シンボル1();
	this.instance_1334.setTransform(139.5,120.05);

	this.instance_1335 = new lib.シンボル1();
	this.instance_1335.setTransform(121,106.55);

	this.instance_1336 = new lib.シンボル1();
	this.instance_1336.setTransform(320.5,145.25);

	this.instance_1337 = new lib.シンボル1();
	this.instance_1337.setTransform(302,131.75);

	this.instance_1338 = new lib.シンボル1();
	this.instance_1338.setTransform(116,85.05);

	this.instance_1339 = new lib.シンボル1();
	this.instance_1339.setTransform(97.5,71.55);

	this.instance_1340 = new lib.シンボル1();
	this.instance_1340.setTransform(207.5,145.25);

	this.instance_1341 = new lib.シンボル1();
	this.instance_1341.setTransform(189,131.75);

	this.instance_1342 = new lib.シンボル1();
	this.instance_1342.setTransform(3,85.05);

	this.instance_1343 = new lib.シンボル1();
	this.instance_1343.setTransform(-15.5,71.55);

	this.instance_1344 = new lib.シンボル1();
	this.instance_1344.setTransform(293.5,173.55);

	this.instance_1345 = new lib.シンボル1();
	this.instance_1345.setTransform(275,160.05);

	this.instance_1346 = new lib.シンボル1();
	this.instance_1346.setTransform(89,113.35);

	this.instance_1347 = new lib.シンボル1();
	this.instance_1347.setTransform(70.5,99.85);

	this.instance_1348 = new lib.シンボル1();
	this.instance_1348.setTransform(180.5,173.55);

	this.instance_1349 = new lib.シンボル1();
	this.instance_1349.setTransform(162,160.05);

	this.instance_1350 = new lib.シンボル1();
	this.instance_1350.setTransform(-24,113.35);

	this.instance_1351 = new lib.シンボル1();
	this.instance_1351.setTransform(-10.5,138.35,1,1,0,0,180);

	this.instance_1352 = new lib.シンボル1();
	this.instance_1352.setTransform(157,138.55);

	this.instance_1353 = new lib.シンボル1();
	this.instance_1353.setTransform(138.5,125.05);

	this.instance_1354 = new lib.シンボル1();
	this.instance_1354.setTransform(-5.5,116.85,1,1,0,0,180);

	this.instance_1355 = new lib.シンボル1();
	this.instance_1355.setTransform(13,103.35,1,1,0,0,180);

	this.instance_1356 = new lib.シンボル1();
	this.instance_1356.setTransform(44,138.55);

	this.instance_1357 = new lib.シンボル1();
	this.instance_1357.setTransform(25.5,125.05);

	this.instance_1358 = new lib.シンボル1();
	this.instance_1358.setTransform(107.5,116.85,1,1,0,0,180);

	this.instance_1359 = new lib.シンボル1();
	this.instance_1359.setTransform(126,103.35,1,1,0,0,180);

	this.instance_1360 = new lib.シンボル1();
	this.instance_1360.setTransform(256.5,233.75);

	this.instance_1361 = new lib.シンボル1();
	this.instance_1361.setTransform(238,220.25);

	this.instance_1362 = new lib.シンボル1();
	this.instance_1362.setTransform(52,173.55);

	this.instance_1363 = new lib.シンボル1();
	this.instance_1363.setTransform(33.5,160.05);

	this.instance_1364 = new lib.シンボル1();
	this.instance_1364.setTransform(143.5,233.75);

	this.instance_1365 = new lib.シンボル1();
	this.instance_1365.setTransform(125,220.25);

	this.instance_1366 = new lib.シンボル1();
	this.instance_1366.setTransform(8,212.05,1,1,0,0,180);

	this.instance_1367 = new lib.シンボル1();
	this.instance_1367.setTransform(26.5,198.55,1,1,0,0,180);

	this.instance_1368 = new lib.シンボル1();
	this.instance_1368.setTransform(120,198.75);

	this.instance_1369 = new lib.シンボル1();
	this.instance_1369.setTransform(101.5,185.25);

	this.instance_1370 = new lib.シンボル1();
	this.instance_1370.setTransform(31.5,177.05,1,1,0,0,180);

	this.instance_1371 = new lib.シンボル1();
	this.instance_1371.setTransform(50,163.55,1,1,0,0,180);

	this.instance_1372 = new lib.シンボル1();
	this.instance_1372.setTransform(7,198.75);

	this.instance_1373 = new lib.シンボル1();
	this.instance_1373.setTransform(-11.5,185.25);

	this.instance_1374 = new lib.シンボル1();
	this.instance_1374.setTransform(144.5,177.05,1,1,0,0,180);

	this.instance_1375 = new lib.シンボル1();
	this.instance_1375.setTransform(163,163.55,1,1,0,0,180);

	this.instance_1376 = new lib.シンボル1();
	this.instance_1376.setTransform(398.5,133.55);

	this.instance_1377 = new lib.シンボル1();
	this.instance_1377.setTransform(380,120.05);

	this.instance_1378 = new lib.シンボル1();
	this.instance_1378.setTransform(194,73.35);

	this.instance_1379 = new lib.シンボル1();
	this.instance_1379.setTransform(175.5,59.85);

	this.instance_1380 = new lib.シンボル1();
	this.instance_1380.setTransform(285.5,133.55);

	this.instance_1381 = new lib.シンボル1();
	this.instance_1381.setTransform(267,120.05);

	this.instance_1382 = new lib.シンボル1();
	this.instance_1382.setTransform(81,73.35);

	this.instance_1383 = new lib.シンボル1();
	this.instance_1383.setTransform(62.5,59.85);

	this.instance_1384 = new lib.シンボル1();
	this.instance_1384.setTransform(262,98.55);

	this.instance_1385 = new lib.シンボル1();
	this.instance_1385.setTransform(243.5,85.05);

	this.instance_1386 = new lib.シンボル1();
	this.instance_1386.setTransform(57.5,38.35);

	this.instance_1387 = new lib.シンボル1();
	this.instance_1387.setTransform(39,24.85);

	this.instance_1388 = new lib.シンボル1();
	this.instance_1388.setTransform(149,98.55);

	this.instance_1389 = new lib.シンボル1();
	this.instance_1389.setTransform(130.5,85.05);

	this.instance_1390 = new lib.シンボル1();
	this.instance_1390.setTransform(2.5,76.85,1,1,0,0,180);

	this.instance_1391 = new lib.シンボル1();
	this.instance_1391.setTransform(21,63.35,1,1,0,0,180);

	this.instance_1392 = new lib.シンボル1();
	this.instance_1392.setTransform(361.5,193.75);

	this.instance_1393 = new lib.シンボル1();
	this.instance_1393.setTransform(343,180.25);

	this.instance_1394 = new lib.シンボル1();
	this.instance_1394.setTransform(157,133.55);

	this.instance_1395 = new lib.シンボル1();
	this.instance_1395.setTransform(138.5,120.05);

	this.instance_1396 = new lib.シンボル1();
	this.instance_1396.setTransform(248.5,193.75);

	this.instance_1397 = new lib.シンボル1();
	this.instance_1397.setTransform(230,180.25);

	this.instance_1398 = new lib.シンボル1();
	this.instance_1398.setTransform(44,133.55);

	this.instance_1399 = new lib.シンボル1();
	this.instance_1399.setTransform(25.5,120.05);

	this.instance_1400 = new lib.シンボル1();
	this.instance_1400.setTransform(225,158.75);

	this.instance_1401 = new lib.シンボル1();
	this.instance_1401.setTransform(206.5,145.25);

	this.instance_1402 = new lib.シンボル1();
	this.instance_1402.setTransform(20.5,98.55);

	this.instance_1403 = new lib.シンボル1();
	this.instance_1403.setTransform(2,85.05);

	this.instance_1404 = new lib.シンボル1();
	this.instance_1404.setTransform(112,158.75);

	this.instance_1405 = new lib.シンボル1();
	this.instance_1405.setTransform(93.5,145.25);

	this.instance_1406 = new lib.シンボル1();
	this.instance_1406.setTransform(39.5,137.05,1,1,0,0,180);

	this.instance_1407 = new lib.シンボル1();
	this.instance_1407.setTransform(58,123.55,1,1,0,0,180);

	this.instance_1408 = new lib.シンボル1();
	this.instance_1408.setTransform(477,137.05);

	this.instance_1409 = new lib.シンボル1();
	this.instance_1409.setTransform(458.5,123.55);

	this.instance_1410 = new lib.シンボル1();
	this.instance_1410.setTransform(272.5,76.85);

	this.instance_1411 = new lib.シンボル1();
	this.instance_1411.setTransform(254,63.35);

	this.instance_1412 = new lib.シンボル1();
	this.instance_1412.setTransform(364,137.05);

	this.instance_1413 = new lib.シンボル1();
	this.instance_1413.setTransform(345.5,123.55);

	this.instance_1414 = new lib.シンボル1();
	this.instance_1414.setTransform(159.5,76.85);

	this.instance_1415 = new lib.シンボル1();
	this.instance_1415.setTransform(141,63.35);

	this.instance_1416 = new lib.シンボル1();
	this.instance_1416.setTransform(340.5,102.05);

	this.instance_1417 = new lib.シンボル1();
	this.instance_1417.setTransform(322,88.55);

	this.instance_1418 = new lib.シンボル1();
	this.instance_1418.setTransform(136,41.85);

	this.instance_1419 = new lib.シンボル1();
	this.instance_1419.setTransform(117.5,28.35);

	this.instance_1420 = new lib.シンボル1();
	this.instance_1420.setTransform(227.5,102.05);

	this.instance_1421 = new lib.シンボル1();
	this.instance_1421.setTransform(209,88.55);

	this.instance_1422 = new lib.シンボル1();
	this.instance_1422.setTransform(23,41.85);

	this.instance_1423 = new lib.シンボル1();
	this.instance_1423.setTransform(4.5,28.35);

	this.instance_1424 = new lib.シンボル1();
	this.instance_1424.setTransform(440,197.25);

	this.instance_1425 = new lib.シンボル1();
	this.instance_1425.setTransform(421.5,183.75);

	this.instance_1426 = new lib.シンボル1();
	this.instance_1426.setTransform(235.5,137.05);

	this.instance_1427 = new lib.シンボル1();
	this.instance_1427.setTransform(217,123.55);

	this.instance_1428 = new lib.シンボル1();
	this.instance_1428.setTransform(327,197.25);

	this.instance_1429 = new lib.シンボル1();
	this.instance_1429.setTransform(308.5,183.75);

	this.instance_1430 = new lib.シンボル1();
	this.instance_1430.setTransform(122.5,137.05);

	this.instance_1431 = new lib.シンボル1();
	this.instance_1431.setTransform(104,123.55);

	this.instance_1432 = new lib.シンボル1();
	this.instance_1432.setTransform(303.5,162.25);

	this.instance_1433 = new lib.シンボル1();
	this.instance_1433.setTransform(285,148.75);

	this.instance_1434 = new lib.シンボル1();
	this.instance_1434.setTransform(99,102.05);

	this.instance_1435 = new lib.シンボル1();
	this.instance_1435.setTransform(80.5,88.55);

	this.instance_1436 = new lib.シンボル1();
	this.instance_1436.setTransform(190.5,162.25);

	this.instance_1437 = new lib.シンボル1();
	this.instance_1437.setTransform(172,148.75);

	this.instance_1438 = new lib.シンボル1();
	this.instance_1438.setTransform(-14,102.05);

	this.instance_1439 = new lib.シンボル1();
	this.instance_1439.setTransform(-20.5,127.05,1,1,0,0,180);

	this.instance_1440 = new lib.シンボル1();
	this.instance_1440.setTransform(425,83.55);

	this.instance_1441 = new lib.シンボル1();
	this.instance_1441.setTransform(406.5,70.05);

	this.instance_1442 = new lib.シンボル1();
	this.instance_1442.setTransform(377.5,36.85);

	this.instance_1443 = new lib.シンボル1();
	this.instance_1443.setTransform(359,23.35);

	this.instance_1444 = new lib.シンボル1();
	this.instance_1444.setTransform(469,97.05);

	this.instance_1445 = new lib.シンボル1();
	this.instance_1445.setTransform(450.5,83.55);

	this.instance_1446 = new lib.シンボル1();
	this.instance_1446.setTransform(264.5,36.85);

	this.instance_1447 = new lib.シンボル1();
	this.instance_1447.setTransform(246,23.35);

	this.instance_1448 = new lib.シンボル1();
	this.instance_1448.setTransform(445.5,62.05);

	this.instance_1449 = new lib.シンボル1();
	this.instance_1449.setTransform(427,48.55);

	this.instance_1450 = new lib.シンボル1();
	this.instance_1450.setTransform(241,1.85);

	this.instance_1451 = new lib.シンボル1();
	this.instance_1451.setTransform(222.5,-11.65);

	this.instance_1452 = new lib.シンボル1();
	this.instance_1452.setTransform(332.5,62.05);

	this.instance_1453 = new lib.シンボル1();
	this.instance_1453.setTransform(314,48.55);

	this.instance_1454 = new lib.シンボル1();
	this.instance_1454.setTransform(128,1.85);

	this.instance_1455 = new lib.シンボル1();
	this.instance_1455.setTransform(109.5,-11.65);

	this.instance_1456 = new lib.シンボル1();
	this.instance_1456.setTransform(388,143.75);

	this.instance_1457 = new lib.シンボル1();
	this.instance_1457.setTransform(369.5,130.25);

	this.instance_1458 = new lib.シンボル1();
	this.instance_1458.setTransform(340.5,97.05);

	this.instance_1459 = new lib.シンボル1();
	this.instance_1459.setTransform(322,83.55);

	this.instance_1460 = new lib.シンボル1();
	this.instance_1460.setTransform(432,157.25);

	this.instance_1461 = new lib.シンボル1();
	this.instance_1461.setTransform(413.5,143.75);

	this.instance_1462 = new lib.シンボル1();
	this.instance_1462.setTransform(227.5,97.05);

	this.instance_1463 = new lib.シンボル1();
	this.instance_1463.setTransform(209,83.55);

	this.instance_1464 = new lib.シンボル1();
	this.instance_1464.setTransform(408.5,122.25);

	this.instance_1465 = new lib.シンボル1();
	this.instance_1465.setTransform(390,108.75);

	this.instance_1466 = new lib.シンボル1();
	this.instance_1466.setTransform(204,62.05);

	this.instance_1467 = new lib.シンボル1();
	this.instance_1467.setTransform(185.5,48.55);

	this.instance_1468 = new lib.シンボル1();
	this.instance_1468.setTransform(295.5,122.25);

	this.instance_1469 = new lib.シンボル1();
	this.instance_1469.setTransform(277,108.75);

	this.instance_1470 = new lib.シンボル1();
	this.instance_1470.setTransform(91,62.05);

	this.instance_1471 = new lib.シンボル1();
	this.instance_1471.setTransform(72.5,48.55);

	this.instance_1472 = new lib.シンボル1();
	this.instance_1472.setTransform(381.5,150.55);

	this.instance_1473 = new lib.シンボル1();
	this.instance_1473.setTransform(363,137.05);

	this.instance_1474 = new lib.シンボル1();
	this.instance_1474.setTransform(177,90.35);

	this.instance_1475 = new lib.シンボル1();
	this.instance_1475.setTransform(158.5,76.85);

	this.instance_1476 = new lib.シンボル1();
	this.instance_1476.setTransform(268.5,150.55);

	this.instance_1477 = new lib.シンボル1();
	this.instance_1477.setTransform(250,137.05);

	this.instance_1478 = new lib.シンボル1();
	this.instance_1478.setTransform(64,90.35);

	this.instance_1479 = new lib.シンボル1();
	this.instance_1479.setTransform(45.5,76.85);

	this.instance_1480 = new lib.シンボル1();
	this.instance_1480.setTransform(245,115.55);

	this.instance_1481 = new lib.シンボル1();
	this.instance_1481.setTransform(226.5,102.05);

	this.instance_1482 = new lib.シンボル1();
	this.instance_1482.setTransform(40.5,55.35);

	this.instance_1483 = new lib.シンボル1();
	this.instance_1483.setTransform(22,41.85);

	this.instance_1484 = new lib.シンボル1();
	this.instance_1484.setTransform(132,115.55);

	this.instance_1485 = new lib.シンボル1();
	this.instance_1485.setTransform(113.5,102.05);

	this.instance_1486 = new lib.シンボル1();
	this.instance_1486.setTransform(19.5,93.85,1,1,0,0,180);

	this.instance_1487 = new lib.シンボル1();
	this.instance_1487.setTransform(38,80.35,1,1,0,0,180);

	this.instance_1488 = new lib.シンボル1();
	this.instance_1488.setTransform(344.5,210.75);

	this.instance_1489 = new lib.シンボル1();
	this.instance_1489.setTransform(326,197.25);

	this.instance_1490 = new lib.シンボル1();
	this.instance_1490.setTransform(140,150.55);

	this.instance_1491 = new lib.シンボル1();
	this.instance_1491.setTransform(121.5,137.05);

	this.instance_1492 = new lib.シンボル1();
	this.instance_1492.setTransform(231.5,210.75);

	this.instance_1493 = new lib.シンボル1();
	this.instance_1493.setTransform(213,197.25);

	this.instance_1494 = new lib.シンボル1();
	this.instance_1494.setTransform(27,150.55);

	this.instance_1495 = new lib.シンボル1();
	this.instance_1495.setTransform(8.5,137.05);

	this.instance_1496 = new lib.シンボル1();
	this.instance_1496.setTransform(208,175.75);

	this.instance_1497 = new lib.シンボル1();
	this.instance_1497.setTransform(189.5,162.25);

	this.instance_1498 = new lib.シンボル1();
	this.instance_1498.setTransform(3.5,115.55);

	this.instance_1499 = new lib.シンボル1();
	this.instance_1499.setTransform(-15,102.05);

	this.instance_1500 = new lib.シンボル1();
	this.instance_1500.setTransform(95,175.75);

	this.instance_1501 = new lib.シンボル1();
	this.instance_1501.setTransform(76.5,162.25);

	this.instance_1502 = new lib.シンボル1();
	this.instance_1502.setTransform(56.5,154.05,1,1,0,0,180);

	this.instance_1503 = new lib.シンボル1();
	this.instance_1503.setTransform(75,140.55,1,1,0,0,180);

	this.instance_1504 = new lib.シンボル1();
	this.instance_1504.setTransform(486.5,110.55);

	this.instance_1505 = new lib.シンボル1();
	this.instance_1505.setTransform(468,97.05);

	this.instance_1506 = new lib.シンボル1();
	this.instance_1506.setTransform(282,50.35);

	this.instance_1507 = new lib.シンボル1();
	this.instance_1507.setTransform(263.5,36.85);

	this.instance_1508 = new lib.シンボル1();
	this.instance_1508.setTransform(373.5,110.55);

	this.instance_1509 = new lib.シンボル1();
	this.instance_1509.setTransform(355,97.05);

	this.instance_1510 = new lib.シンボル1();
	this.instance_1510.setTransform(169,50.35);

	this.instance_1511 = new lib.シンボル1();
	this.instance_1511.setTransform(150.5,36.85);

	this.instance_1512 = new lib.シンボル1();
	this.instance_1512.setTransform(350,75.55);

	this.instance_1513 = new lib.シンボル1();
	this.instance_1513.setTransform(331.5,62.05);

	this.instance_1514 = new lib.シンボル1();
	this.instance_1514.setTransform(145.5,15.35);

	this.instance_1515 = new lib.シンボル1();
	this.instance_1515.setTransform(127,1.85);

	this.instance_1516 = new lib.シンボル1();
	this.instance_1516.setTransform(237,75.55);

	this.instance_1517 = new lib.シンボル1();
	this.instance_1517.setTransform(218.5,62.05);

	this.instance_1518 = new lib.シンボル1();
	this.instance_1518.setTransform(32.5,15.35);

	this.instance_1519 = new lib.シンボル1();
	this.instance_1519.setTransform(14,1.85);

	this.instance_1520 = new lib.シンボル1();
	this.instance_1520.setTransform(449.5,170.75);

	this.instance_1521 = new lib.シンボル1();
	this.instance_1521.setTransform(431,157.25);

	this.instance_1522 = new lib.シンボル1();
	this.instance_1522.setTransform(245,110.55);

	this.instance_1523 = new lib.シンボル1();
	this.instance_1523.setTransform(226.5,97.05);

	this.instance_1524 = new lib.シンボル1();
	this.instance_1524.setTransform(336.5,170.75);

	this.instance_1525 = new lib.シンボル1();
	this.instance_1525.setTransform(318,157.25);

	this.instance_1526 = new lib.シンボル1();
	this.instance_1526.setTransform(132,110.55);

	this.instance_1527 = new lib.シンボル1();
	this.instance_1527.setTransform(113.5,97.05);

	this.instance_1528 = new lib.シンボル1();
	this.instance_1528.setTransform(313,135.75);

	this.instance_1529 = new lib.シンボル1();
	this.instance_1529.setTransform(294.5,122.25);

	this.instance_1530 = new lib.シンボル1();
	this.instance_1530.setTransform(108.5,75.55);

	this.instance_1531 = new lib.シンボル1();
	this.instance_1531.setTransform(90,62.05);

	this.instance_1532 = new lib.シンボル1();
	this.instance_1532.setTransform(200,135.75);

	this.instance_1533 = new lib.シンボル1();
	this.instance_1533.setTransform(181.5,122.25);

	this.instance_1534 = new lib.シンボル1();
	this.instance_1534.setTransform(-4.5,75.55);

	this.instance_1535 = new lib.シンボル1();
	this.instance_1535.setTransform(-23,62.05);

	this.instance_1536 = new lib.シンボル1();
	this.instance_1536.setTransform(434,123.55);

	this.instance_1537 = new lib.シンボル1();
	this.instance_1537.setTransform(415.5,110.05);

	this.instance_1538 = new lib.シンボル1();
	this.instance_1538.setTransform(229.5,63.35);

	this.instance_1539 = new lib.シンボル1();
	this.instance_1539.setTransform(211,49.85);

	this.instance_1540 = new lib.シンボル1();
	this.instance_1540.setTransform(321,123.55);

	this.instance_1541 = new lib.シンボル1();
	this.instance_1541.setTransform(302.5,110.05);

	this.instance_1542 = new lib.シンボル1();
	this.instance_1542.setTransform(116.5,63.35);

	this.instance_1543 = new lib.シンボル1();
	this.instance_1543.setTransform(98,49.85);

	this.instance_1544 = new lib.シンボル1();
	this.instance_1544.setTransform(297.5,88.55);

	this.instance_1545 = new lib.シンボル1();
	this.instance_1545.setTransform(279,75.05);

	this.instance_1546 = new lib.シンボル1();
	this.instance_1546.setTransform(93,28.35);

	this.instance_1547 = new lib.シンボル1();
	this.instance_1547.setTransform(74.5,14.85);

	this.instance_1548 = new lib.シンボル1();
	this.instance_1548.setTransform(184.5,88.55);

	this.instance_1549 = new lib.シンボル1();
	this.instance_1549.setTransform(166,75.05);

	this.instance_1550 = new lib.シンボル1();
	this.instance_1550.setTransform(-20,28.35);

	this.instance_1551 = new lib.シンボル1();
	this.instance_1551.setTransform(-38.5,14.85);

	this.instance_1552 = new lib.シンボル1();
	this.instance_1552.setTransform(397,183.75);

	this.instance_1553 = new lib.シンボル1();
	this.instance_1553.setTransform(378.5,170.25);

	this.instance_1554 = new lib.シンボル1();
	this.instance_1554.setTransform(192.5,123.55);

	this.instance_1555 = new lib.シンボル1();
	this.instance_1555.setTransform(174,110.05);

	this.instance_1556 = new lib.シンボル1();
	this.instance_1556.setTransform(284,183.75);

	this.instance_1557 = new lib.シンボル1();
	this.instance_1557.setTransform(265.5,170.25);

	this.instance_1558 = new lib.シンボル1();
	this.instance_1558.setTransform(79.5,123.55);

	this.instance_1559 = new lib.シンボル1();
	this.instance_1559.setTransform(61,110.05);

	this.instance_1560 = new lib.シンボル1();
	this.instance_1560.setTransform(260.5,148.75);

	this.instance_1561 = new lib.シンボル1();
	this.instance_1561.setTransform(242,135.25);

	this.instance_1562 = new lib.シンボル1();
	this.instance_1562.setTransform(56,88.55);

	this.instance_1563 = new lib.シンボル1();
	this.instance_1563.setTransform(37.5,75.05);

	this.instance_1564 = new lib.シンボル1();
	this.instance_1564.setTransform(147.5,148.75);

	this.instance_1565 = new lib.シンボル1();
	this.instance_1565.setTransform(129,135.25);

	this.instance_1566 = new lib.シンボル1();
	this.instance_1566.setTransform(-46,127.05,1,1,0,0,180);

	this.instance_1567 = new lib.シンボル1();
	this.instance_1567.setTransform(-27.5,113.55,1,1,0,0,180);

	this.instance_1568 = new lib.シンボル1();
	this.instance_1568.setTransform(382,70.05);

	this.instance_1569 = new lib.シンボル1();
	this.instance_1569.setTransform(363.5,56.55);

	this.instance_1570 = new lib.シンボル1();
	this.instance_1570.setTransform(334.5,23.35);

	this.instance_1571 = new lib.シンボル1();
	this.instance_1571.setTransform(316,9.85);

	this.instance_1572 = new lib.シンボル1();
	this.instance_1572.setTransform(426,83.55);

	this.instance_1573 = new lib.シンボル1();
	this.instance_1573.setTransform(407.5,70.05);

	this.instance_1574 = new lib.シンボル1();
	this.instance_1574.setTransform(221.5,23.35);

	this.instance_1575 = new lib.シンボル1();
	this.instance_1575.setTransform(203,9.85);

	this.instance_1576 = new lib.シンボル1();
	this.instance_1576.setTransform(402.5,48.55);

	this.instance_1577 = new lib.シンボル1();
	this.instance_1577.setTransform(384,35.05);

	this.instance_1578 = new lib.シンボル1();
	this.instance_1578.setTransform(198,-11.65);

	this.instance_1579 = new lib.シンボル1();
	this.instance_1579.setTransform(179.5,-25.15);

	this.instance_1580 = new lib.シンボル1();
	this.instance_1580.setTransform(289.5,48.55);

	this.instance_1581 = new lib.シンボル1();
	this.instance_1581.setTransform(271,35.05);

	this.instance_1582 = new lib.シンボル1();
	this.instance_1582.setTransform(85,-11.65);

	this.instance_1583 = new lib.シンボル1();
	this.instance_1583.setTransform(66.5,-25.15);

	this.instance_1584 = new lib.シンボル1();
	this.instance_1584.setTransform(345,130.25);

	this.instance_1585 = new lib.シンボル1();
	this.instance_1585.setTransform(326.5,116.75);

	this.instance_1586 = new lib.シンボル1();
	this.instance_1586.setTransform(297.5,83.55);

	this.instance_1587 = new lib.シンボル1();
	this.instance_1587.setTransform(279,70.05);

	this.instance_1588 = new lib.シンボル1();
	this.instance_1588.setTransform(389,143.75);

	this.instance_1589 = new lib.シンボル1();
	this.instance_1589.setTransform(370.5,130.25);

	this.instance_1590 = new lib.シンボル1();
	this.instance_1590.setTransform(184.5,83.55);

	this.instance_1591 = new lib.シンボル1();
	this.instance_1591.setTransform(166,70.05);

	this.instance_1592 = new lib.シンボル1();
	this.instance_1592.setTransform(365.5,108.75);

	this.instance_1593 = new lib.シンボル1();
	this.instance_1593.setTransform(347,95.25);

	this.instance_1594 = new lib.シンボル1();
	this.instance_1594.setTransform(161,48.55);

	this.instance_1595 = new lib.シンボル1();
	this.instance_1595.setTransform(142.5,35.05);

	this.instance_1596 = new lib.シンボル1();
	this.instance_1596.setTransform(252.5,108.75);

	this.instance_1597 = new lib.シンボル1();
	this.instance_1597.setTransform(234,95.25);

	this.instance_1598 = new lib.シンボル1();
	this.instance_1598.setTransform(48,48.55);

	this.instance_1599 = new lib.シンボル1();
	this.instance_1599.setTransform(29.5,35.05);

	this.instance_1600 = new lib.シンボル1();
	this.instance_1600.setTransform(338.5,137.05);

	this.instance_1601 = new lib.シンボル1();
	this.instance_1601.setTransform(320,123.55);

	this.instance_1602 = new lib.シンボル1();
	this.instance_1602.setTransform(134,76.85);

	this.instance_1603 = new lib.シンボル1();
	this.instance_1603.setTransform(115.5,63.35);

	this.instance_1604 = new lib.シンボル1();
	this.instance_1604.setTransform(225.5,137.05);

	this.instance_1605 = new lib.シンボル1();
	this.instance_1605.setTransform(207,123.55);

	this.instance_1606 = new lib.シンボル1();
	this.instance_1606.setTransform(21,76.85);

	this.instance_1607 = new lib.シンボル1();
	this.instance_1607.setTransform(2.5,63.35);

	this.instance_1608 = new lib.シンボル1();
	this.instance_1608.setTransform(202,102.05);

	this.instance_1609 = new lib.シンボル1();
	this.instance_1609.setTransform(183.5,88.55);

	this.instance_1610 = new lib.シンボル1();
	this.instance_1610.setTransform(-2.5,41.85);

	this.instance_1611 = new lib.シンボル1();
	this.instance_1611.setTransform(-21,28.35);

	this.instance_1612 = new lib.シンボル1();
	this.instance_1612.setTransform(89,102.05);

	this.instance_1613 = new lib.シンボル1();
	this.instance_1613.setTransform(70.5,88.55);

	this.instance_1614 = new lib.シンボル1();
	this.instance_1614.setTransform(12.5,80.35,1,1,0,0,180);

	this.instance_1615 = new lib.シンボル1();
	this.instance_1615.setTransform(31,66.85,1,1,0,0,180);

	this.instance_1616 = new lib.シンボル1();
	this.instance_1616.setTransform(301.5,197.25);

	this.instance_1617 = new lib.シンボル1();
	this.instance_1617.setTransform(283,183.75);

	this.instance_1618 = new lib.シンボル1();
	this.instance_1618.setTransform(97,137.05);

	this.instance_1619 = new lib.シンボル1();
	this.instance_1619.setTransform(78.5,123.55);

	this.instance_1620 = new lib.シンボル1();
	this.instance_1620.setTransform(188.5,197.25);

	this.instance_1621 = new lib.シンボル1();
	this.instance_1621.setTransform(170,183.75);

	this.instance_1622 = new lib.シンボル1();
	this.instance_1622.setTransform(-16,137.05);

	this.instance_1623 = new lib.シンボル1();
	this.instance_1623.setTransform(-34.5,123.55);

	this.instance_1624 = new lib.シンボル1();
	this.instance_1624.setTransform(165,162.25);

	this.instance_1625 = new lib.シンボル1();
	this.instance_1625.setTransform(146.5,148.75);

	this.instance_1626 = new lib.シンボル1();
	this.instance_1626.setTransform(-39.5,102.05);

	this.instance_1627 = new lib.シンボル1();
	this.instance_1627.setTransform(-45,127.05,1,1,0,0,180);

	this.instance_1628 = new lib.シンボル1();
	this.instance_1628.setTransform(52,162.25);

	this.instance_1629 = new lib.シンボル1();
	this.instance_1629.setTransform(33.5,148.75);

	this.instance_1630 = new lib.シンボル1();
	this.instance_1630.setTransform(49.5,140.55,1,1,0,0,180);

	this.instance_1631 = new lib.シンボル1();
	this.instance_1631.setTransform(68,127.05,1,1,0,0,180);

	this.instance_1632 = new lib.シンボル1();
	this.instance_1632.setTransform(443.5,97.05);

	this.instance_1633 = new lib.シンボル1();
	this.instance_1633.setTransform(425,83.55);

	this.instance_1634 = new lib.シンボル1();
	this.instance_1634.setTransform(239,36.85);

	this.instance_1635 = new lib.シンボル1();
	this.instance_1635.setTransform(220.5,23.35);

	this.instance_1636 = new lib.シンボル1();
	this.instance_1636.setTransform(330.5,97.05);

	this.instance_1637 = new lib.シンボル1();
	this.instance_1637.setTransform(312,83.55);

	this.instance_1638 = new lib.シンボル1();
	this.instance_1638.setTransform(126,36.85);

	this.instance_1639 = new lib.シンボル1();
	this.instance_1639.setTransform(107.5,23.35);

	this.instance_1640 = new lib.シンボル1();
	this.instance_1640.setTransform(307,62.05);

	this.instance_1641 = new lib.シンボル1();
	this.instance_1641.setTransform(288.5,48.55);

	this.instance_1642 = new lib.シンボル1();
	this.instance_1642.setTransform(102.5,1.85);

	this.instance_1643 = new lib.シンボル1();
	this.instance_1643.setTransform(84,-11.65);

	this.instance_1644 = new lib.シンボル1();
	this.instance_1644.setTransform(194,62.05);

	this.instance_1645 = new lib.シンボル1();
	this.instance_1645.setTransform(175.5,48.55);

	this.instance_1646 = new lib.シンボル1();
	this.instance_1646.setTransform(-10.5,1.85);

	this.instance_1647 = new lib.シンボル1();
	this.instance_1647.setTransform(-29,-11.65);

	this.instance_1648 = new lib.シンボル1();
	this.instance_1648.setTransform(406.5,157.25);

	this.instance_1649 = new lib.シンボル1();
	this.instance_1649.setTransform(388,143.75);

	this.instance_1650 = new lib.シンボル1();
	this.instance_1650.setTransform(202,97.05);

	this.instance_1651 = new lib.シンボル1();
	this.instance_1651.setTransform(183.5,83.55);

	this.instance_1652 = new lib.シンボル1();
	this.instance_1652.setTransform(293.5,157.25);

	this.instance_1653 = new lib.シンボル1();
	this.instance_1653.setTransform(275,143.75);

	this.instance_1654 = new lib.シンボル1();
	this.instance_1654.setTransform(89,97.05);

	this.instance_1655 = new lib.シンボル1();
	this.instance_1655.setTransform(70.5,83.55);

	this.instance_1656 = new lib.シンボル1();
	this.instance_1656.setTransform(270,122.25);

	this.instance_1657 = new lib.シンボル1();
	this.instance_1657.setTransform(251.5,108.75);

	this.instance_1658 = new lib.シンボル1();
	this.instance_1658.setTransform(65.5,62.05);

	this.instance_1659 = new lib.シンボル1();
	this.instance_1659.setTransform(47,48.55);

	this.instance_1660 = new lib.シンボル1();
	this.instance_1660.setTransform(157,122.25);

	this.instance_1661 = new lib.シンボル1();
	this.instance_1661.setTransform(138.5,108.75);

	this.instance_1662 = new lib.シンボル1();
	this.instance_1662.setTransform(-47.5,62.05);

	this.instance_1663 = new lib.シンボル1();
	this.instance_1663.setTransform(-37,87.05,1,1,0,0,180);

	this.instance_1664 = new lib.シンボル1();
	this.instance_1664.setTransform(365,87.05);

	this.instance_1665 = new lib.シンボル1();
	this.instance_1665.setTransform(346.5,73.55);

	this.instance_1666 = new lib.シンボル1();
	this.instance_1666.setTransform(317.5,40.35);

	this.instance_1667 = new lib.シンボル1();
	this.instance_1667.setTransform(299,26.85);

	this.instance_1668 = new lib.シンボル1();
	this.instance_1668.setTransform(409,100.55);

	this.instance_1669 = new lib.シンボル1();
	this.instance_1669.setTransform(390.5,87.05);

	this.instance_1670 = new lib.シンボル1();
	this.instance_1670.setTransform(204.5,40.35);

	this.instance_1671 = new lib.シンボル1();
	this.instance_1671.setTransform(186,26.85);

	this.instance_1672 = new lib.シンボル1();
	this.instance_1672.setTransform(385.5,65.55);

	this.instance_1673 = new lib.シンボル1();
	this.instance_1673.setTransform(367,52.05);

	this.instance_1674 = new lib.シンボル1();
	this.instance_1674.setTransform(181,5.35);

	this.instance_1675 = new lib.シンボル1();
	this.instance_1675.setTransform(162.5,-8.15);

	this.instance_1676 = new lib.シンボル1();
	this.instance_1676.setTransform(272.5,65.55);

	this.instance_1677 = new lib.シンボル1();
	this.instance_1677.setTransform(254,52.05);

	this.instance_1678 = new lib.シンボル1();
	this.instance_1678.setTransform(68,5.35);

	this.instance_1679 = new lib.シンボル1();
	this.instance_1679.setTransform(49.5,-8.15);

	this.instance_1680 = new lib.シンボル1();
	this.instance_1680.setTransform(328,147.25);

	this.instance_1681 = new lib.シンボル1();
	this.instance_1681.setTransform(466.5,147.25);

	this.instance_1682 = new lib.シンボル1();
	this.instance_1682.setTransform(280.5,100.55);

	this.instance_1683 = new lib.シンボル1();
	this.instance_1683.setTransform(262,87.05);

	this.instance_1684 = new lib.シンボル1();
	this.instance_1684.setTransform(372,160.75);

	this.instance_1685 = new lib.シンボル1();
	this.instance_1685.setTransform(353.5,147.25);

	this.instance_1686 = new lib.シンボル1();
	this.instance_1686.setTransform(167.5,100.55);

	this.instance_1687 = new lib.シンボル1();
	this.instance_1687.setTransform(149,87.05);

	this.instance_1688 = new lib.シンボル1();
	this.instance_1688.setTransform(348.5,125.75);

	this.instance_1689 = new lib.シンボル1();
	this.instance_1689.setTransform(330,112.25);

	this.instance_1690 = new lib.シンボル1();
	this.instance_1690.setTransform(144,65.55);

	this.instance_1691 = new lib.シンボル1();
	this.instance_1691.setTransform(125.5,52.05);

	this.instance_1692 = new lib.シンボル1();
	this.instance_1692.setTransform(235.5,125.75);

	this.instance_1693 = new lib.シンボル1();
	this.instance_1693.setTransform(217,112.25);

	this.instance_1694 = new lib.シンボル1();
	this.instance_1694.setTransform(31,65.55);

	this.instance_1695 = new lib.シンボル1();
	this.instance_1695.setTransform(12.5,52.05);

	this.instance_1696 = new lib.シンボル1();
	this.instance_1696.setTransform(470,47.05);

	this.instance_1697 = new lib.シンボル1();
	this.instance_1697.setTransform(451.5,33.55);

	this.instance_1698 = new lib.シンボル1();
	this.instance_1698.setTransform(422.5,0.35);

	this.instance_1699 = new lib.シンボル1();
	this.instance_1699.setTransform(404,-13.15);

	this.instance_1700 = new lib.シンボル1();
	this.instance_1700.setTransform(357,47.05);

	this.instance_1701 = new lib.シンボル1();
	this.instance_1701.setTransform(338.5,33.55);

	this.instance_1702 = new lib.シンボル1();
	this.instance_1702.setTransform(309.5,0.35);

	this.instance_1703 = new lib.シンボル1();
	this.instance_1703.setTransform(291,-13.15);

	this.instance_1704 = new lib.シンボル1();
	this.instance_1704.setTransform(333.5,12.05);

	this.instance_1705 = new lib.シンボル1();
	this.instance_1705.setTransform(315,-1.45);

	this.instance_1706 = new lib.シンボル1();
	this.instance_1706.setTransform(286,-34.65);

	this.instance_1707 = new lib.シンボル1();
	this.instance_1707.setTransform(267.5,-48.15);

	this.instance_1708 = new lib.シンボル1();
	this.instance_1708.setTransform(377.5,25.55);

	this.instance_1709 = new lib.シンボル1();
	this.instance_1709.setTransform(359,12.05);

	this.instance_1710 = new lib.シンボル1();
	this.instance_1710.setTransform(173,-34.65);

	this.instance_1711 = new lib.シンボル1();
	this.instance_1711.setTransform(154.5,-48.15);

	this.instance_1712 = new lib.シンボル1();
	this.instance_1712.setTransform(433,107.25);

	this.instance_1713 = new lib.シンボル1();
	this.instance_1713.setTransform(414.5,93.75);

	this.instance_1714 = new lib.シンボル1();
	this.instance_1714.setTransform(385.5,60.55);

	this.instance_1715 = new lib.シンボル1();
	this.instance_1715.setTransform(367,47.05);

	this.instance_1716 = new lib.シンボル1();
	this.instance_1716.setTransform(320,107.25);

	this.instance_1717 = new lib.シンボル1();
	this.instance_1717.setTransform(458.5,107.25);

	this.instance_1718 = new lib.シンボル1();
	this.instance_1718.setTransform(272.5,60.55);

	this.instance_1719 = new lib.シンボル1();
	this.instance_1719.setTransform(254,47.05);

	this.instance_1720 = new lib.シンボル1();
	this.instance_1720.setTransform(453.5,85.75);

	this.instance_1721 = new lib.シンボル1();
	this.instance_1721.setTransform(435,72.25);

	this.instance_1722 = new lib.シンボル1();
	this.instance_1722.setTransform(249,25.55);

	this.instance_1723 = new lib.シンボル1();
	this.instance_1723.setTransform(230.5,12.05);

	this.instance_1724 = new lib.シンボル1();
	this.instance_1724.setTransform(340.5,85.75);

	this.instance_1725 = new lib.シンボル1();
	this.instance_1725.setTransform(322,72.25);

	this.instance_1726 = new lib.シンボル1();
	this.instance_1726.setTransform(136,25.55);

	this.instance_1727 = new lib.シンボル1();
	this.instance_1727.setTransform(117.5,12.05);

	this.instance_1728 = new lib.シンボル1();
	this.instance_1728.setTransform(426.5,114.05);

	this.instance_1729 = new lib.シンボル1();
	this.instance_1729.setTransform(408,100.55);

	this.instance_1730 = new lib.シンボル1();
	this.instance_1730.setTransform(222,53.85);

	this.instance_1731 = new lib.シンボル1();
	this.instance_1731.setTransform(203.5,40.35);

	this.instance_1732 = new lib.シンボル1();
	this.instance_1732.setTransform(313.5,114.05);

	this.instance_1733 = new lib.シンボル1();
	this.instance_1733.setTransform(295,100.55);

	this.instance_1734 = new lib.シンボル1();
	this.instance_1734.setTransform(109,53.85);

	this.instance_1735 = new lib.シンボル1();
	this.instance_1735.setTransform(90.5,40.35);

	this.instance_1736 = new lib.シンボル1();
	this.instance_1736.setTransform(290,79.05);

	this.instance_1737 = new lib.シンボル1();
	this.instance_1737.setTransform(271.5,65.55);

	this.instance_1738 = new lib.シンボル1();
	this.instance_1738.setTransform(85.5,18.85);

	this.instance_1739 = new lib.シンボル1();
	this.instance_1739.setTransform(67,5.35);

	this.instance_1740 = new lib.シンボル1();
	this.instance_1740.setTransform(177,79.05);

	this.instance_1741 = new lib.シンボル1();
	this.instance_1741.setTransform(158.5,65.55);

	this.instance_1742 = new lib.シンボル1();
	this.instance_1742.setTransform(-27.5,18.85);

	this.instance_1743 = new lib.シンボル1();
	this.instance_1743.setTransform(-46,5.35);

	this.instance_1744 = new lib.シンボル1();
	this.instance_1744.setTransform(389.5,174.25);

	this.instance_1745 = new lib.シンボル1();
	this.instance_1745.setTransform(371,160.75);

	this.instance_1746 = new lib.シンボル1();
	this.instance_1746.setTransform(185,114.05);

	this.instance_1747 = new lib.シンボル1();
	this.instance_1747.setTransform(166.5,100.55);

	this.instance_1748 = new lib.シンボル1();
	this.instance_1748.setTransform(276.5,174.25);

	this.instance_1749 = new lib.シンボル1();
	this.instance_1749.setTransform(258,160.75);

	this.instance_1750 = new lib.シンボル1();
	this.instance_1750.setTransform(72,114.05);

	this.instance_1751 = new lib.シンボル1();
	this.instance_1751.setTransform(53.5,100.55);

	this.instance_1752 = new lib.シンボル1();
	this.instance_1752.setTransform(253,139.25);

	this.instance_1753 = new lib.シンボル1();
	this.instance_1753.setTransform(234.5,125.75);

	this.instance_1754 = new lib.シンボル1();
	this.instance_1754.setTransform(48.5,79.05);

	this.instance_1755 = new lib.シンボル1();
	this.instance_1755.setTransform(30,65.55);

	this.instance_1756 = new lib.シンボル1();
	this.instance_1756.setTransform(140,139.25);

	this.instance_1757 = new lib.シンボル1();
	this.instance_1757.setTransform(121.5,125.75);

	this.instance_1758 = new lib.シンボル1();
	this.instance_1758.setTransform(-38.5,117.55,1,1,0,0,180);

	this.instance_1759 = new lib.シンボル1();
	this.instance_1759.setTransform(-20,104.05,1,1,0,0,180);

	this.instance_1760 = new lib.シンボル1();
	this.instance_1760.setTransform(374.5,60.55);

	this.instance_1761 = new lib.シンボル1();
	this.instance_1761.setTransform(356,47.05);

	this.instance_1762 = new lib.シンボル1();
	this.instance_1762.setTransform(327,13.85);

	this.instance_1763 = new lib.シンボル1();
	this.instance_1763.setTransform(308.5,0.35);

	this.instance_1764 = new lib.シンボル1();
	this.instance_1764.setTransform(418.5,74.05);

	this.instance_1765 = new lib.シンボル1();
	this.instance_1765.setTransform(400,60.55);

	this.instance_1766 = new lib.シンボル1();
	this.instance_1766.setTransform(214,13.85);

	this.instance_1767 = new lib.シンボル1();
	this.instance_1767.setTransform(195.5,0.35);

	this.instance_1768 = new lib.シンボル1();
	this.instance_1768.setTransform(395,39.05);

	this.instance_1769 = new lib.シンボル1();
	this.instance_1769.setTransform(376.5,25.55);

	this.instance_1770 = new lib.シンボル1();
	this.instance_1770.setTransform(190.5,-21.15);

	this.instance_1771 = new lib.シンボル1();
	this.instance_1771.setTransform(172,-34.65);

	this.instance_1772 = new lib.シンボル1();
	this.instance_1772.setTransform(282,39.05);

	this.instance_1773 = new lib.シンボル1();
	this.instance_1773.setTransform(263.5,25.55);

	this.instance_1774 = new lib.シンボル1();
	this.instance_1774.setTransform(77.5,-21.15);

	this.instance_1775 = new lib.シンボル1();
	this.instance_1775.setTransform(59,-34.65);

	this.instance_1776 = new lib.シンボル1();
	this.instance_1776.setTransform(337.5,120.75);

	this.instance_1777 = new lib.シンボル1();
	this.instance_1777.setTransform(319,107.25);

	this.instance_1778 = new lib.シンボル1();
	this.instance_1778.setTransform(290,74.05);

	this.instance_1779 = new lib.シンボル1();
	this.instance_1779.setTransform(271.5,60.55);

	this.instance_1780 = new lib.シンボル1();
	this.instance_1780.setTransform(381.5,134.25);

	this.instance_1781 = new lib.シンボル1();
	this.instance_1781.setTransform(363,120.75);

	this.instance_1782 = new lib.シンボル1();
	this.instance_1782.setTransform(177,74.05);

	this.instance_1783 = new lib.シンボル1();
	this.instance_1783.setTransform(158.5,60.55);

	this.instance_1784 = new lib.シンボル1();
	this.instance_1784.setTransform(358,99.25);

	this.instance_1785 = new lib.シンボル1();
	this.instance_1785.setTransform(339.5,85.75);

	this.instance_1786 = new lib.シンボル1();
	this.instance_1786.setTransform(153.5,39.05);

	this.instance_1787 = new lib.シンボル1();
	this.instance_1787.setTransform(135,25.55);

	this.instance_1788 = new lib.シンボル1();
	this.instance_1788.setTransform(245,99.25);

	this.instance_1789 = new lib.シンボル1();
	this.instance_1789.setTransform(226.5,85.75);

	this.instance_1790 = new lib.シンボル1();
	this.instance_1790.setTransform(40.5,39.05);

	this.instance_1791 = new lib.シンボル1();
	this.instance_1791.setTransform(22,25.55);

	this.instance_1792 = new lib.シンボル1();
	this.instance_1792.setTransform(364,137.05);

	this.instance_1793 = new lib.シンボル1();
	this.instance_1793.setTransform(345.5,123.55);

	this.instance_1794 = new lib.シンボル1();
	this.instance_1794.setTransform(159.5,76.85);

	this.instance_1795 = new lib.シンボル1();
	this.instance_1795.setTransform(141,63.35);

	this.instance_1796 = new lib.シンボル1();
	this.instance_1796.setTransform(251,137.05);

	this.instance_1797 = new lib.シンボル1();
	this.instance_1797.setTransform(232.5,123.55);

	this.instance_1798 = new lib.シンボル1();
	this.instance_1798.setTransform(46.5,76.85);

	this.instance_1799 = new lib.シンボル1();
	this.instance_1799.setTransform(28,63.35);

	this.instance_1800 = new lib.シンボル1();
	this.instance_1800.setTransform(227.5,102.05);

	this.instance_1801 = new lib.シンボル1();
	this.instance_1801.setTransform(209,88.55);

	this.instance_1802 = new lib.シンボル1();
	this.instance_1802.setTransform(23,41.85);

	this.instance_1803 = new lib.シンボル1();
	this.instance_1803.setTransform(4.5,28.35);

	this.instance_1804 = new lib.シンボル1();
	this.instance_1804.setTransform(114.5,102.05);

	this.instance_1805 = new lib.シンボル1();
	this.instance_1805.setTransform(96,88.55);

	this.instance_1806 = new lib.シンボル1();
	this.instance_1806.setTransform(-13,80.35,1,1,0,0,180);

	this.instance_1807 = new lib.シンボル1();
	this.instance_1807.setTransform(5.5,66.85,1,1,0,0,180);

	this.instance_1808 = new lib.シンボル1();
	this.instance_1808.setTransform(327,197.25);

	this.instance_1809 = new lib.シンボル1();
	this.instance_1809.setTransform(308.5,183.75);

	this.instance_1810 = new lib.シンボル1();
	this.instance_1810.setTransform(122.5,137.05);

	this.instance_1811 = new lib.シンボル1();
	this.instance_1811.setTransform(104,123.55);

	this.instance_1812 = new lib.シンボル1();
	this.instance_1812.setTransform(214,197.25);

	this.instance_1813 = new lib.シンボル1();
	this.instance_1813.setTransform(195.5,183.75);

	this.instance_1814 = new lib.シンボル1();
	this.instance_1814.setTransform(9.5,137.05);

	this.instance_1815 = new lib.シンボル1();
	this.instance_1815.setTransform(-9,123.55);

	this.instance_1816 = new lib.シンボル1();
	this.instance_1816.setTransform(190.5,162.25);

	this.instance_1817 = new lib.シンボル1();
	this.instance_1817.setTransform(172,148.75);

	this.instance_1818 = new lib.シンボル1();
	this.instance_1818.setTransform(-14,102.05);

	this.instance_1819 = new lib.シンボル1();
	this.instance_1819.setTransform(-32.5,88.55);

	this.instance_1820 = new lib.シンボル1();
	this.instance_1820.setTransform(77.5,162.25);

	this.instance_1821 = new lib.シンボル1();
	this.instance_1821.setTransform(59,148.75);

	this.instance_1822 = new lib.シンボル1();
	this.instance_1822.setTransform(24,140.55,1,1,0,0,180);

	this.instance_1823 = new lib.シンボル1();
	this.instance_1823.setTransform(42.5,127.05,1,1,0,0,180);

	this.instance_1824 = new lib.シンボル1();
	this.instance_1824.setTransform(312,83.55);

	this.instance_1825 = new lib.シンボル1();
	this.instance_1825.setTransform(450.5,83.55);

	this.instance_1826 = new lib.シンボル1();
	this.instance_1826.setTransform(264.5,36.85);

	this.instance_1827 = new lib.シンボル1();
	this.instance_1827.setTransform(246,23.35);

	this.instance_1828 = new lib.シンボル1();
	this.instance_1828.setTransform(356,97.05);

	this.instance_1829 = new lib.シンボル1();
	this.instance_1829.setTransform(337.5,83.55);

	this.instance_1830 = new lib.シンボル1();
	this.instance_1830.setTransform(151.5,36.85);

	this.instance_1831 = new lib.シンボル1();
	this.instance_1831.setTransform(133,23.35);

	this.instance_1832 = new lib.シンボル1();
	this.instance_1832.setTransform(332.5,62.05);

	this.instance_1833 = new lib.シンボル1();
	this.instance_1833.setTransform(314,48.55);

	this.instance_1834 = new lib.シンボル1();
	this.instance_1834.setTransform(128,1.85);

	this.instance_1835 = new lib.シンボル1();
	this.instance_1835.setTransform(109.5,-11.65);

	this.instance_1836 = new lib.シンボル1();
	this.instance_1836.setTransform(219.5,62.05);

	this.instance_1837 = new lib.シンボル1();
	this.instance_1837.setTransform(201,48.55);

	this.instance_1838 = new lib.シンボル1();
	this.instance_1838.setTransform(15,1.85);

	this.instance_1839 = new lib.シンボル1();
	this.instance_1839.setTransform(-3.5,-11.65);

	this.instance_1840 = new lib.シンボル1();
	this.instance_1840.setTransform(432,157.25);

	this.instance_1841 = new lib.シンボル1();
	this.instance_1841.setTransform(413.5,143.75);

	this.instance_1842 = new lib.シンボル1();
	this.instance_1842.setTransform(227.5,97.05);

	this.instance_1843 = new lib.シンボル1();
	this.instance_1843.setTransform(209,83.55);

	this.instance_1844 = new lib.シンボル1();
	this.instance_1844.setTransform(319,157.25);

	this.instance_1845 = new lib.シンボル1();
	this.instance_1845.setTransform(300.5,143.75);

	this.instance_1846 = new lib.シンボル1();
	this.instance_1846.setTransform(114.5,97.05);

	this.instance_1847 = new lib.シンボル1();
	this.instance_1847.setTransform(96,83.55);

	this.instance_1848 = new lib.シンボル1();
	this.instance_1848.setTransform(295.5,122.25);

	this.instance_1849 = new lib.シンボル1();
	this.instance_1849.setTransform(277,108.75);

	this.instance_1850 = new lib.シンボル1();
	this.instance_1850.setTransform(91,62.05);

	this.instance_1851 = new lib.シンボル1();
	this.instance_1851.setTransform(72.5,48.55);

	this.instance_1852 = new lib.シンボル1();
	this.instance_1852.setTransform(182.5,122.25);

	this.instance_1853 = new lib.シンボル1();
	this.instance_1853.setTransform(164,108.75);

	this.instance_1854 = new lib.シンボル1();
	this.instance_1854.setTransform(-22,62.05);

	this.instance_1855 = new lib.シンボル1();
	this.instance_1855.setTransform(-40.5,48.55);

	this.instance_1856 = new lib.シンボル1();
	this.instance_1856.setTransform(268.5,150.55);

	this.instance_1857 = new lib.シンボル1();
	this.instance_1857.setTransform(250,137.05);

	this.instance_1858 = new lib.シンボル1();
	this.instance_1858.setTransform(64,90.35);

	this.instance_1859 = new lib.シンボル1();
	this.instance_1859.setTransform(45.5,76.85);

	this.instance_1860 = new lib.シンボル1();
	this.instance_1860.setTransform(155.5,150.55);

	this.instance_1861 = new lib.シンボル1();
	this.instance_1861.setTransform(137,137.05);

	this.instance_1862 = new lib.シンボル1();
	this.instance_1862.setTransform(-49,90.35);

	this.instance_1863 = new lib.シンボル1();
	this.instance_1863.setTransform(-35.5,115.35,1,1,0,0,180);

	this.instance_1864 = new lib.シンボル1();
	this.instance_1864.setTransform(132,115.55);

	this.instance_1865 = new lib.シンボル1();
	this.instance_1865.setTransform(113.5,102.05);

	this.instance_1866 = new lib.シンボル1();
	this.instance_1866.setTransform(-30.5,93.85,1,1,0,0,180);

	this.instance_1867 = new lib.シンボル1();
	this.instance_1867.setTransform(-12,80.35,1,1,0,0,180);

	this.instance_1868 = new lib.シンボル1();
	this.instance_1868.setTransform(19,115.55);

	this.instance_1869 = new lib.シンボル1();
	this.instance_1869.setTransform(0.5,102.05);

	this.instance_1870 = new lib.シンボル1();
	this.instance_1870.setTransform(82.5,93.85,1,1,0,0,180);

	this.instance_1871 = new lib.シンボル1();
	this.instance_1871.setTransform(101,80.35,1,1,0,0,180);

	this.instance_1872 = new lib.シンボル1();
	this.instance_1872.setTransform(231.5,210.75);

	this.instance_1873 = new lib.シンボル1();
	this.instance_1873.setTransform(213,197.25);

	this.instance_1874 = new lib.シンボル1();
	this.instance_1874.setTransform(27,150.55);

	this.instance_1875 = new lib.シンボル1();
	this.instance_1875.setTransform(8.5,137.05);

	this.instance_1876 = new lib.シンボル1();
	this.instance_1876.setTransform(118.5,210.75);

	this.instance_1877 = new lib.シンボル1();
	this.instance_1877.setTransform(100,197.25);

	this.instance_1878 = new lib.シンボル1();
	this.instance_1878.setTransform(-17,189.05,1,1,0,0,180);

	this.instance_1879 = new lib.シンボル1();
	this.instance_1879.setTransform(1.5,175.55,1,1,0,0,180);

	this.instance_1880 = new lib.シンボル1();
	this.instance_1880.setTransform(95,175.75);

	this.instance_1881 = new lib.シンボル1();
	this.instance_1881.setTransform(76.5,162.25);

	this.instance_1882 = new lib.シンボル1();
	this.instance_1882.setTransform(6.5,154.05,1,1,0,0,180);

	this.instance_1883 = new lib.シンボル1();
	this.instance_1883.setTransform(25,140.55,1,1,0,0,180);

	this.instance_1884 = new lib.シンボル1();
	this.instance_1884.setTransform(-18,175.75);

	this.instance_1885 = new lib.シンボル1();
	this.instance_1885.setTransform(-36.5,162.25);

	this.instance_1886 = new lib.シンボル1();
	this.instance_1886.setTransform(119.5,154.05,1,1,0,0,180);

	this.instance_1887 = new lib.シンボル1();
	this.instance_1887.setTransform(138,140.55,1,1,0,0,180);

	this.instance_1888 = new lib.シンボル1();
	this.instance_1888.setTransform(373.5,110.55);

	this.instance_1889 = new lib.シンボル1();
	this.instance_1889.setTransform(355,97.05);

	this.instance_1890 = new lib.シンボル1();
	this.instance_1890.setTransform(169,50.35);

	this.instance_1891 = new lib.シンボル1();
	this.instance_1891.setTransform(150.5,36.85);

	this.instance_1892 = new lib.シンボル1();
	this.instance_1892.setTransform(260.5,110.55);

	this.instance_1893 = new lib.シンボル1();
	this.instance_1893.setTransform(242,97.05);

	this.instance_1894 = new lib.シンボル1();
	this.instance_1894.setTransform(56,50.35);

	this.instance_1895 = new lib.シンボル1();
	this.instance_1895.setTransform(37.5,36.85);

	this.instance_1896 = new lib.シンボル1();
	this.instance_1896.setTransform(237,75.55);

	this.instance_1897 = new lib.シンボル1();
	this.instance_1897.setTransform(218.5,62.05);

	this.instance_1898 = new lib.シンボル1();
	this.instance_1898.setTransform(32.5,15.35);

	this.instance_1899 = new lib.シンボル1();
	this.instance_1899.setTransform(14,1.85);

	this.instance_1900 = new lib.シンボル1();
	this.instance_1900.setTransform(124,75.55);

	this.instance_1901 = new lib.シンボル1();
	this.instance_1901.setTransform(105.5,62.05);

	this.instance_1902 = new lib.シンボル1();
	this.instance_1902.setTransform(-22.5,53.85,1,1,0,0,180);

	this.instance_1903 = new lib.シンボル1();
	this.instance_1903.setTransform(-4,40.35,1,1,0,0,180);

	this.instance_1904 = new lib.シンボル1();
	this.instance_1904.setTransform(336.5,170.75);

	this.instance_1905 = new lib.シンボル1();
	this.instance_1905.setTransform(318,157.25);

	this.instance_1906 = new lib.シンボル1();
	this.instance_1906.setTransform(132,110.55);

	this.instance_1907 = new lib.シンボル1();
	this.instance_1907.setTransform(113.5,97.05);

	this.instance_1908 = new lib.シンボル1();
	this.instance_1908.setTransform(223.5,170.75);

	this.instance_1909 = new lib.シンボル1();
	this.instance_1909.setTransform(205,157.25);

	this.instance_1910 = new lib.シンボル1();
	this.instance_1910.setTransform(19,110.55);

	this.instance_1911 = new lib.シンボル1();
	this.instance_1911.setTransform(0.5,97.05);

	this.instance_1912 = new lib.シンボル1();
	this.instance_1912.setTransform(200,135.75);

	this.instance_1913 = new lib.シンボル1();
	this.instance_1913.setTransform(181.5,122.25);

	this.instance_1914 = new lib.シンボル1();
	this.instance_1914.setTransform(-4.5,75.55);

	this.instance_1915 = new lib.シンボル1();
	this.instance_1915.setTransform(-23,62.05);

	this.instance_1916 = new lib.シンボル1();
	this.instance_1916.setTransform(87,135.75);

	this.instance_1917 = new lib.シンボル1();
	this.instance_1917.setTransform(68.5,122.25);

	this.instance_1918 = new lib.シンボル1();
	this.instance_1918.setTransform(14.5,114.05,1,1,0,0,180);

	this.instance_1919 = new lib.シンボル1();
	this.instance_1919.setTransform(33,100.55,1,1,0,0,180);

	this.instance_1920 = new lib.シンボル1();
	this.instance_1920.setTransform(452,114.05);

	this.instance_1921 = new lib.シンボル1();
	this.instance_1921.setTransform(433.5,100.55);

	this.instance_1922 = new lib.シンボル1();
	this.instance_1922.setTransform(247.5,53.85);

	this.instance_1923 = new lib.シンボル1();
	this.instance_1923.setTransform(229,40.35);

	this.instance_1924 = new lib.シンボル1();
	this.instance_1924.setTransform(339,114.05);

	this.instance_1925 = new lib.シンボル1();
	this.instance_1925.setTransform(320.5,100.55);

	this.instance_1926 = new lib.シンボル1();
	this.instance_1926.setTransform(134.5,53.85);

	this.instance_1927 = new lib.シンボル1();
	this.instance_1927.setTransform(116,40.35);

	this.instance_1928 = new lib.シンボル1();
	this.instance_1928.setTransform(315.5,79.05);

	this.instance_1929 = new lib.シンボル1();
	this.instance_1929.setTransform(297,65.55);

	this.instance_1930 = new lib.シンボル1();
	this.instance_1930.setTransform(111,18.85);

	this.instance_1931 = new lib.シンボル1();
	this.instance_1931.setTransform(92.5,5.35);

	this.instance_1932 = new lib.シンボル1();
	this.instance_1932.setTransform(202.5,79.05);

	this.instance_1933 = new lib.シンボル1();
	this.instance_1933.setTransform(184,65.55);

	this.instance_1934 = new lib.シンボル1();
	this.instance_1934.setTransform(-2,18.85);

	this.instance_1935 = new lib.シンボル1();
	this.instance_1935.setTransform(-20.5,5.35);

	this.instance_1936 = new lib.シンボル1();
	this.instance_1936.setTransform(415,174.25);

	this.instance_1937 = new lib.シンボル1();
	this.instance_1937.setTransform(396.5,160.75);

	this.instance_1938 = new lib.シンボル1();
	this.instance_1938.setTransform(210.5,114.05);

	this.instance_1939 = new lib.シンボル1();
	this.instance_1939.setTransform(192,100.55);

	this.instance_1940 = new lib.シンボル1();
	this.instance_1940.setTransform(302,174.25);

	this.instance_1941 = new lib.シンボル1();
	this.instance_1941.setTransform(283.5,160.75);

	this.instance_1942 = new lib.シンボル1();
	this.instance_1942.setTransform(97.5,114.05);

	this.instance_1943 = new lib.シンボル1();
	this.instance_1943.setTransform(79,100.55);

	this.instance_1944 = new lib.シンボル1();
	this.instance_1944.setTransform(278.5,139.25);

	this.instance_1945 = new lib.シンボル1();
	this.instance_1945.setTransform(260,125.75);

	this.instance_1946 = new lib.シンボル1();
	this.instance_1946.setTransform(74,79.05);

	this.instance_1947 = new lib.シンボル1();
	this.instance_1947.setTransform(55.5,65.55);

	this.instance_1948 = new lib.シンボル1();
	this.instance_1948.setTransform(165.5,139.25);

	this.instance_1949 = new lib.シンボル1();
	this.instance_1949.setTransform(147,125.75);

	this.instance_1950 = new lib.シンボル1();
	this.instance_1950.setTransform(-39,79.05);

	this.instance_1951 = new lib.シンボル1();
	this.instance_1951.setTransform(-45.5,104.05,1,1,0,0,180);

	this.instance_1952 = new lib.シンボル1();
	this.instance_1952.setTransform(400,60.55);

	this.instance_1953 = new lib.シンボル1();
	this.instance_1953.setTransform(381.5,47.05);

	this.instance_1954 = new lib.シンボル1();
	this.instance_1954.setTransform(352.5,13.85);

	this.instance_1955 = new lib.シンボル1();
	this.instance_1955.setTransform(334,0.35);

	this.instance_1956 = new lib.シンボル1();
	this.instance_1956.setTransform(444,74.05);

	this.instance_1957 = new lib.シンボル1();
	this.instance_1957.setTransform(425.5,60.55);

	this.instance_1958 = new lib.シンボル1();
	this.instance_1958.setTransform(239.5,13.85);

	this.instance_1959 = new lib.シンボル1();
	this.instance_1959.setTransform(221,0.35);

	this.instance_1960 = new lib.シンボル1();
	this.instance_1960.setTransform(420.5,39.05);

	this.instance_1961 = new lib.シンボル1();
	this.instance_1961.setTransform(402,25.55);

	this.instance_1962 = new lib.シンボル1();
	this.instance_1962.setTransform(216,-21.15);

	this.instance_1963 = new lib.シンボル1();
	this.instance_1963.setTransform(197.5,-34.65);

	this.instance_1964 = new lib.シンボル1();
	this.instance_1964.setTransform(307.5,39.05);

	this.instance_1965 = new lib.シンボル1();
	this.instance_1965.setTransform(289,25.55);

	this.instance_1966 = new lib.シンボル1();
	this.instance_1966.setTransform(103,-21.15);

	this.instance_1967 = new lib.シンボル1();
	this.instance_1967.setTransform(84.5,-34.65);

	this.instance_1968 = new lib.シンボル1();
	this.instance_1968.setTransform(363,120.75);

	this.instance_1969 = new lib.シンボル1();
	this.instance_1969.setTransform(344.5,107.25);

	this.instance_1970 = new lib.シンボル1();
	this.instance_1970.setTransform(315.5,74.05);

	this.instance_1971 = new lib.シンボル1();
	this.instance_1971.setTransform(297,60.55);

	this.instance_1972 = new lib.シンボル1();
	this.instance_1972.setTransform(407,134.25);

	this.instance_1973 = new lib.シンボル1();
	this.instance_1973.setTransform(388.5,120.75);

	this.instance_1974 = new lib.シンボル1();
	this.instance_1974.setTransform(202.5,74.05);

	this.instance_1975 = new lib.シンボル1();
	this.instance_1975.setTransform(184,60.55);

	this.instance_1976 = new lib.シンボル1();
	this.instance_1976.setTransform(383.5,99.25);

	this.instance_1977 = new lib.シンボル1();
	this.instance_1977.setTransform(365,85.75);

	this.instance_1978 = new lib.シンボル1();
	this.instance_1978.setTransform(179,39.05);

	this.instance_1979 = new lib.シンボル1();
	this.instance_1979.setTransform(160.5,25.55);

	this.instance_1980 = new lib.シンボル1();
	this.instance_1980.setTransform(270.5,99.25);

	this.instance_1981 = new lib.シンボル1();
	this.instance_1981.setTransform(252,85.75);

	this.instance_1982 = new lib.シンボル1();
	this.instance_1982.setTransform(66,39.05);

	this.instance_1983 = new lib.シンボル1();
	this.instance_1983.setTransform(47.5,25.55);

	this.instance_1984 = new lib.シンボル1();
	this.instance_1984.setTransform(356.5,127.55);

	this.instance_1985 = new lib.シンボル1();
	this.instance_1985.setTransform(338,114.05);

	this.instance_1986 = new lib.シンボル1();
	this.instance_1986.setTransform(152,67.35);

	this.instance_1987 = new lib.シンボル1();
	this.instance_1987.setTransform(133.5,53.85);

	this.instance_1988 = new lib.シンボル1();
	this.instance_1988.setTransform(243.5,127.55);

	this.instance_1989 = new lib.シンボル1();
	this.instance_1989.setTransform(225,114.05);

	this.instance_1990 = new lib.シンボル1();
	this.instance_1990.setTransform(39,67.35);

	this.instance_1991 = new lib.シンボル1();
	this.instance_1991.setTransform(20.5,53.85);

	this.instance_1992 = new lib.シンボル1();
	this.instance_1992.setTransform(220,92.55);

	this.instance_1993 = new lib.シンボル1();
	this.instance_1993.setTransform(201.5,79.05);

	this.instance_1994 = new lib.シンボル1();
	this.instance_1994.setTransform(15.5,32.35);

	this.instance_1995 = new lib.シンボル1();
	this.instance_1995.setTransform(-3,18.85);

	this.instance_1996 = new lib.シンボル1();
	this.instance_1996.setTransform(107,92.55);

	this.instance_1997 = new lib.シンボル1();
	this.instance_1997.setTransform(88.5,79.05);

	this.instance_1998 = new lib.シンボル1();
	this.instance_1998.setTransform(-5.5,70.85,1,1,0,0,180);

	this.instance_1999 = new lib.シンボル1();
	this.instance_1999.setTransform(13,57.35,1,1,0,0,180);

	this.instance_2000 = new lib.シンボル1();
	this.instance_2000.setTransform(319.5,187.75);

	this.instance_2001 = new lib.シンボル1();
	this.instance_2001.setTransform(301,174.25);

	this.instance_2002 = new lib.シンボル1();
	this.instance_2002.setTransform(115,127.55);

	this.instance_2003 = new lib.シンボル1();
	this.instance_2003.setTransform(96.5,114.05);

	this.instance_2004 = new lib.シンボル1();
	this.instance_2004.setTransform(206.5,187.75);

	this.instance_2005 = new lib.シンボル1();
	this.instance_2005.setTransform(188,174.25);

	this.instance_2006 = new lib.シンボル1();
	this.instance_2006.setTransform(2,127.55);

	this.instance_2007 = new lib.シンボル1();
	this.instance_2007.setTransform(-16.5,114.05);

	this.instance_2008 = new lib.シンボル1();
	this.instance_2008.setTransform(183,152.75);

	this.instance_2009 = new lib.シンボル1();
	this.instance_2009.setTransform(164.5,139.25);

	this.instance_2010 = new lib.シンボル1();
	this.instance_2010.setTransform(-21.5,92.55);

	this.instance_2011 = new lib.シンボル1();
	this.instance_2011.setTransform(-40,79.05);

	this.instance_2012 = new lib.シンボル1();
	this.instance_2012.setTransform(70,152.75);

	this.instance_2013 = new lib.シンボル1();
	this.instance_2013.setTransform(51.5,139.25);

	this.instance_2014 = new lib.シンボル1();
	this.instance_2014.setTransform(31.5,131.05,1,1,0,0,180);

	this.instance_2015 = new lib.シンボル1();
	this.instance_2015.setTransform(50,117.55,1,1,0,0,180);

	this.instance_2016 = new lib.シンボル1();
	this.instance_2016.setTransform(461.5,87.55);

	this.instance_2017 = new lib.シンボル1();
	this.instance_2017.setTransform(443,74.05);

	this.instance_2018 = new lib.シンボル1();
	this.instance_2018.setTransform(257,27.35);

	this.instance_2019 = new lib.シンボル1();
	this.instance_2019.setTransform(238.5,13.85);

	this.instance_2020 = new lib.シンボル1();
	this.instance_2020.setTransform(348.5,87.55);

	this.instance_2021 = new lib.シンボル1();
	this.instance_2021.setTransform(330,74.05);

	this.instance_2022 = new lib.シンボル1();
	this.instance_2022.setTransform(144,27.35);

	this.instance_2023 = new lib.シンボル1();
	this.instance_2023.setTransform(125.5,13.85);

	this.instance_2024 = new lib.シンボル1();
	this.instance_2024.setTransform(325,52.55);

	this.instance_2025 = new lib.シンボル1();
	this.instance_2025.setTransform(306.5,39.05);

	this.instance_2026 = new lib.シンボル1();
	this.instance_2026.setTransform(120.5,-7.65);

	this.instance_2027 = new lib.シンボル1();
	this.instance_2027.setTransform(102,-21.15);

	this.instance_2028 = new lib.シンボル1();
	this.instance_2028.setTransform(212,52.55);

	this.instance_2029 = new lib.シンボル1();
	this.instance_2029.setTransform(193.5,39.05);

	this.instance_2030 = new lib.シンボル1();
	this.instance_2030.setTransform(7.5,-7.65);

	this.instance_2031 = new lib.シンボル1();
	this.instance_2031.setTransform(-11,-21.15);

	this.instance_2032 = new lib.シンボル1();
	this.instance_2032.setTransform(424.5,147.75);

	this.instance_2033 = new lib.シンボル1();
	this.instance_2033.setTransform(406,134.25);

	this.instance_2034 = new lib.シンボル1();
	this.instance_2034.setTransform(220,87.55);

	this.instance_2035 = new lib.シンボル1();
	this.instance_2035.setTransform(201.5,74.05);

	this.instance_2036 = new lib.シンボル1();
	this.instance_2036.setTransform(311.5,147.75);

	this.instance_2037 = new lib.シンボル1();
	this.instance_2037.setTransform(293,134.25);

	this.instance_2038 = new lib.シンボル1();
	this.instance_2038.setTransform(107,87.55);

	this.instance_2039 = new lib.シンボル1();
	this.instance_2039.setTransform(88.5,74.05);

	this.instance_2040 = new lib.シンボル1();
	this.instance_2040.setTransform(288,112.75);

	this.instance_2041 = new lib.シンボル1();
	this.instance_2041.setTransform(269.5,99.25);

	this.instance_2042 = new lib.シンボル1();
	this.instance_2042.setTransform(83.5,52.55);

	this.instance_2043 = new lib.シンボル1();
	this.instance_2043.setTransform(65,39.05);

	this.instance_2044 = new lib.シンボル1();
	this.instance_2044.setTransform(175,112.75);

	this.instance_2045 = new lib.シンボル1();
	this.instance_2045.setTransform(156.5,99.25);

	this.instance_2046 = new lib.シンボル1();
	this.instance_2046.setTransform(-29.5,52.55);

	this.instance_2047 = new lib.シンボル1();
	this.instance_2047.setTransform(-48,39.05);

	this.instance_2048 = new lib.シンボル1();
	this.instance_2048.setTransform(542.5,159.55);

	this.instance_2049 = new lib.シンボル1();
	this.instance_2049.setTransform(524,146.05);

	this.instance_2050 = new lib.シンボル1();
	this.instance_2050.setTransform(338,99.35);

	this.instance_2051 = new lib.シンボル1();
	this.instance_2051.setTransform(319.5,85.85);

	this.instance_2052 = new lib.シンボル1();
	this.instance_2052.setTransform(429.5,159.55);

	this.instance_2053 = new lib.シンボル1();
	this.instance_2053.setTransform(411,146.05);

	this.instance_2054 = new lib.シンボル1();
	this.instance_2054.setTransform(225,99.35);

	this.instance_2055 = new lib.シンボル1();
	this.instance_2055.setTransform(206.5,85.85);

	this.instance_2056 = new lib.シンボル1();
	this.instance_2056.setTransform(406,124.55);

	this.instance_2057 = new lib.シンボル1();
	this.instance_2057.setTransform(387.5,111.05);

	this.instance_2058 = new lib.シンボル1();
	this.instance_2058.setTransform(201.5,64.35);

	this.instance_2059 = new lib.シンボル1();
	this.instance_2059.setTransform(183,50.85);

	this.instance_2060 = new lib.シンボル1();
	this.instance_2060.setTransform(293,124.55);

	this.instance_2061 = new lib.シンボル1();
	this.instance_2061.setTransform(274.5,111.05);

	this.instance_2062 = new lib.シンボル1();
	this.instance_2062.setTransform(88.5,64.35);

	this.instance_2063 = new lib.シンボル1();
	this.instance_2063.setTransform(70,50.85);

	this.instance_2064 = new lib.シンボル1();
	this.instance_2064.setTransform(505.5,219.75);

	this.instance_2065 = new lib.シンボル1();
	this.instance_2065.setTransform(487,206.25);

	this.instance_2066 = new lib.シンボル1();
	this.instance_2066.setTransform(301,159.55);

	this.instance_2067 = new lib.シンボル1();
	this.instance_2067.setTransform(282.5,146.05);

	this.instance_2068 = new lib.シンボル1();
	this.instance_2068.setTransform(392.5,219.75);

	this.instance_2069 = new lib.シンボル1();
	this.instance_2069.setTransform(374,206.25);

	this.instance_2070 = new lib.シンボル1();
	this.instance_2070.setTransform(188,159.55);

	this.instance_2071 = new lib.シンボル1();
	this.instance_2071.setTransform(169.5,146.05);

	this.instance_2072 = new lib.シンボル1();
	this.instance_2072.setTransform(369,184.75);

	this.instance_2073 = new lib.シンボル1();
	this.instance_2073.setTransform(350.5,171.25);

	this.instance_2074 = new lib.シンボル1();
	this.instance_2074.setTransform(164.5,124.55);

	this.instance_2075 = new lib.シンボル1();
	this.instance_2075.setTransform(146,111.05);

	this.instance_2076 = new lib.シンボル1();
	this.instance_2076.setTransform(256,184.75);

	this.instance_2077 = new lib.シンボル1();
	this.instance_2077.setTransform(237.5,171.25);

	this.instance_2078 = new lib.シンボル1();
	this.instance_2078.setTransform(62.5,163.05,1,1,0,0,180);

	this.instance_2079 = new lib.シンボル1();
	this.instance_2079.setTransform(81,149.55,1,1,0,0,180);

	this.instance_2080 = new lib.シンボル1();
	this.instance_2080.setTransform(490.5,106.05);

	this.instance_2081 = new lib.シンボル1();
	this.instance_2081.setTransform(472,92.55);

	this.instance_2082 = new lib.シンボル1();
	this.instance_2082.setTransform(443,59.35);

	this.instance_2083 = new lib.シンボル1();
	this.instance_2083.setTransform(424.5,45.85);

	this.instance_2084 = new lib.シンボル1();
	this.instance_2084.setTransform(534.5,119.55);

	this.instance_2085 = new lib.シンボル1();
	this.instance_2085.setTransform(516,106.05);

	this.instance_2086 = new lib.シンボル1();
	this.instance_2086.setTransform(330,59.35);

	this.instance_2087 = new lib.シンボル1();
	this.instance_2087.setTransform(311.5,45.85);

	this.instance_2088 = new lib.シンボル1();
	this.instance_2088.setTransform(511,84.55);

	this.instance_2089 = new lib.シンボル1();
	this.instance_2089.setTransform(492.5,71.05);

	this.instance_2090 = new lib.シンボル1();
	this.instance_2090.setTransform(306.5,24.35);

	this.instance_2091 = new lib.シンボル1();
	this.instance_2091.setTransform(288,10.85);

	this.instance_2092 = new lib.シンボル1();
	this.instance_2092.setTransform(398,84.55);

	this.instance_2093 = new lib.シンボル1();
	this.instance_2093.setTransform(379.5,71.05);

	this.instance_2094 = new lib.シンボル1();
	this.instance_2094.setTransform(193.5,24.35);

	this.instance_2095 = new lib.シンボル1();
	this.instance_2095.setTransform(175,10.85);

	this.instance_2096 = new lib.シンボル1();
	this.instance_2096.setTransform(453.5,166.25);

	this.instance_2097 = new lib.シンボル1();
	this.instance_2097.setTransform(435,152.75);

	this.instance_2098 = new lib.シンボル1();
	this.instance_2098.setTransform(406,119.55);

	this.instance_2099 = new lib.シンボル1();
	this.instance_2099.setTransform(387.5,106.05);

	this.instance_2100 = new lib.シンボル1();
	this.instance_2100.setTransform(497.5,179.75);

	this.instance_2101 = new lib.シンボル1();
	this.instance_2101.setTransform(479,166.25);

	this.instance_2102 = new lib.シンボル1();
	this.instance_2102.setTransform(293,119.55);

	this.instance_2103 = new lib.シンボル1();
	this.instance_2103.setTransform(274.5,106.05);

	this.instance_2104 = new lib.シンボル1();
	this.instance_2104.setTransform(474,144.75);

	this.instance_2105 = new lib.シンボル1();
	this.instance_2105.setTransform(455.5,131.25);

	this.instance_2106 = new lib.シンボル1();
	this.instance_2106.setTransform(269.5,84.55);

	this.instance_2107 = new lib.シンボル1();
	this.instance_2107.setTransform(251,71.05);

	this.instance_2108 = new lib.シンボル1();
	this.instance_2108.setTransform(361,144.75);

	this.instance_2109 = new lib.シンボル1();
	this.instance_2109.setTransform(342.5,131.25);

	this.instance_2110 = new lib.シンボル1();
	this.instance_2110.setTransform(156.5,84.55);

	this.instance_2111 = new lib.シンボル1();
	this.instance_2111.setTransform(138,71.05);

	this.instance_2112 = new lib.シンボル1();
	this.instance_2112.setTransform(447,173.05);

	this.instance_2113 = new lib.シンボル1();
	this.instance_2113.setTransform(428.5,159.55);

	this.instance_2114 = new lib.シンボル1();
	this.instance_2114.setTransform(242.5,112.85);

	this.instance_2115 = new lib.シンボル1();
	this.instance_2115.setTransform(224,99.35);

	this.instance_2116 = new lib.シンボル1();
	this.instance_2116.setTransform(334,173.05);

	this.instance_2117 = new lib.シンボル1();
	this.instance_2117.setTransform(315.5,159.55);

	this.instance_2118 = new lib.シンボル1();
	this.instance_2118.setTransform(129.5,112.85);

	this.instance_2119 = new lib.シンボル1();
	this.instance_2119.setTransform(111,99.35);

	this.instance_2120 = new lib.シンボル1();
	this.instance_2120.setTransform(310.5,138.05);

	this.instance_2121 = new lib.シンボル1();
	this.instance_2121.setTransform(292,124.55);

	this.instance_2122 = new lib.シンボル1();
	this.instance_2122.setTransform(106,77.85);

	this.instance_2123 = new lib.シンボル1();
	this.instance_2123.setTransform(87.5,64.35);

	this.instance_2124 = new lib.シンボル1();
	this.instance_2124.setTransform(197.5,138.05);

	this.instance_2125 = new lib.シンボル1();
	this.instance_2125.setTransform(179,124.55);

	this.instance_2126 = new lib.シンボル1();
	this.instance_2126.setTransform(121,116.35,1,1,0,0,180);

	this.instance_2127 = new lib.シンボル1();
	this.instance_2127.setTransform(139.5,102.85,1,1,0,0,180);

	this.instance_2128 = new lib.シンボル1();
	this.instance_2128.setTransform(410,233.25);

	this.instance_2129 = new lib.シンボル1();
	this.instance_2129.setTransform(391.5,219.75);

	this.instance_2130 = new lib.シンボル1();
	this.instance_2130.setTransform(205.5,173.05);

	this.instance_2131 = new lib.シンボル1();
	this.instance_2131.setTransform(187,159.55);

	this.instance_2132 = new lib.シンボル1();
	this.instance_2132.setTransform(297,233.25);

	this.instance_2133 = new lib.シンボル1();
	this.instance_2133.setTransform(278.5,219.75);

	this.instance_2134 = new lib.シンボル1();
	this.instance_2134.setTransform(92.5,173.05);

	this.instance_2135 = new lib.シンボル1();
	this.instance_2135.setTransform(74,159.55);

	this.instance_2136 = new lib.シンボル1();
	this.instance_2136.setTransform(273.5,198.25);

	this.instance_2137 = new lib.シンボル1();
	this.instance_2137.setTransform(255,184.75);

	this.instance_2138 = new lib.シンボル1();
	this.instance_2138.setTransform(69,138.05);

	this.instance_2139 = new lib.シンボル1();
	this.instance_2139.setTransform(63.5,163.05,1,1,0,0,180);

	this.instance_2140 = new lib.シンボル1();
	this.instance_2140.setTransform(160.5,198.25);

	this.instance_2141 = new lib.シンボル1();
	this.instance_2141.setTransform(142,184.75);

	this.instance_2142 = new lib.シンボル1();
	this.instance_2142.setTransform(158,176.55,1,1,0,0,180);

	this.instance_2143 = new lib.シンボル1();
	this.instance_2143.setTransform(176.5,163.05,1,1,0,0,180);

	this.instance_2144 = new lib.シンボル1();
	this.instance_2144.setTransform(552,133.05);

	this.instance_2145 = new lib.シンボル1();
	this.instance_2145.setTransform(533.5,119.55);

	this.instance_2146 = new lib.シンボル1();
	this.instance_2146.setTransform(347.5,72.85);

	this.instance_2147 = new lib.シンボル1();
	this.instance_2147.setTransform(329,59.35);

	this.instance_2148 = new lib.シンボル1();
	this.instance_2148.setTransform(439,133.05);

	this.instance_2149 = new lib.シンボル1();
	this.instance_2149.setTransform(420.5,119.55);

	this.instance_2150 = new lib.シンボル1();
	this.instance_2150.setTransform(234.5,72.85);

	this.instance_2151 = new lib.シンボル1();
	this.instance_2151.setTransform(216,59.35);

	this.instance_2152 = new lib.シンボル1();
	this.instance_2152.setTransform(415.5,98.05);

	this.instance_2153 = new lib.シンボル1();
	this.instance_2153.setTransform(397,84.55);

	this.instance_2154 = new lib.シンボル1();
	this.instance_2154.setTransform(211,37.85);

	this.instance_2155 = new lib.シンボル1();
	this.instance_2155.setTransform(192.5,24.35);

	this.instance_2156 = new lib.シンボル1();
	this.instance_2156.setTransform(302.5,98.05);

	this.instance_2157 = new lib.シンボル1();
	this.instance_2157.setTransform(284,84.55);

	this.instance_2158 = new lib.シンボル1();
	this.instance_2158.setTransform(98,37.85);

	this.instance_2159 = new lib.シンボル1();
	this.instance_2159.setTransform(79.5,24.35);

	this.instance_2160 = new lib.シンボル1();
	this.instance_2160.setTransform(515,193.25);

	this.instance_2161 = new lib.シンボル1();
	this.instance_2161.setTransform(496.5,179.75);

	this.instance_2162 = new lib.シンボル1();
	this.instance_2162.setTransform(310.5,133.05);

	this.instance_2163 = new lib.シンボル1();
	this.instance_2163.setTransform(292,119.55);

	this.instance_2164 = new lib.シンボル1();
	this.instance_2164.setTransform(402,193.25);

	this.instance_2165 = new lib.シンボル1();
	this.instance_2165.setTransform(383.5,179.75);

	this.instance_2166 = new lib.シンボル1();
	this.instance_2166.setTransform(197.5,133.05);

	this.instance_2167 = new lib.シンボル1();
	this.instance_2167.setTransform(179,119.55);

	this.instance_2168 = new lib.シンボル1();
	this.instance_2168.setTransform(378.5,158.25);

	this.instance_2169 = new lib.シンボル1();
	this.instance_2169.setTransform(360,144.75);

	this.instance_2170 = new lib.シンボル1();
	this.instance_2170.setTransform(174,98.05);

	this.instance_2171 = new lib.シンボル1();
	this.instance_2171.setTransform(155.5,84.55);

	this.instance_2172 = new lib.シンボル1();
	this.instance_2172.setTransform(265.5,158.25);

	this.instance_2173 = new lib.シンボル1();
	this.instance_2173.setTransform(247,144.75);

	this.instance_2174 = new lib.シンボル1();
	this.instance_2174.setTransform(61,98.05);

	this.instance_2175 = new lib.シンボル1();
	this.instance_2175.setTransform(71.5,123.05,1,1,0,0,180);

	this.instance_2176 = new lib.シンボル1();
	this.instance_2176.setTransform(473.5,123.05);

	this.instance_2177 = new lib.シンボル1();
	this.instance_2177.setTransform(455,109.55);

	this.instance_2178 = new lib.シンボル1();
	this.instance_2178.setTransform(426,76.35);

	this.instance_2179 = new lib.シンボル1();
	this.instance_2179.setTransform(407.5,62.85);

	this.instance_2180 = new lib.シンボル1();
	this.instance_2180.setTransform(517.5,136.55);

	this.instance_2181 = new lib.シンボル1();
	this.instance_2181.setTransform(499,123.05);

	this.instance_2182 = new lib.シンボル1();
	this.instance_2182.setTransform(313,76.35);

	this.instance_2183 = new lib.シンボル1();
	this.instance_2183.setTransform(294.5,62.85);

	this.instance_2184 = new lib.シンボル1();
	this.instance_2184.setTransform(494,101.55);

	this.instance_2185 = new lib.シンボル1();
	this.instance_2185.setTransform(475.5,88.05);

	this.instance_2186 = new lib.シンボル1();
	this.instance_2186.setTransform(289.5,41.35);

	this.instance_2187 = new lib.シンボル1();
	this.instance_2187.setTransform(271,27.85);

	this.instance_2188 = new lib.シンボル1();
	this.instance_2188.setTransform(381,101.55);

	this.instance_2189 = new lib.シンボル1();
	this.instance_2189.setTransform(362.5,88.05);

	this.instance_2190 = new lib.シンボル1();
	this.instance_2190.setTransform(176.5,41.35);

	this.instance_2191 = new lib.シンボル1();
	this.instance_2191.setTransform(158,27.85);

	this.instance_2192 = new lib.シンボル1();
	this.instance_2192.setTransform(436.5,183.25);

	this.instance_2193 = new lib.シンボル1();
	this.instance_2193.setTransform(575,183.25);

	this.instance_2194 = new lib.シンボル1();
	this.instance_2194.setTransform(389,136.55);

	this.instance_2195 = new lib.シンボル1();
	this.instance_2195.setTransform(370.5,123.05);

	this.instance_2196 = new lib.シンボル1();
	this.instance_2196.setTransform(480.5,196.75);

	this.instance_2197 = new lib.シンボル1();
	this.instance_2197.setTransform(462,183.25);

	this.instance_2198 = new lib.シンボル1();
	this.instance_2198.setTransform(276,136.55);

	this.instance_2199 = new lib.シンボル1();
	this.instance_2199.setTransform(257.5,123.05);

	this.instance_2200 = new lib.シンボル1();
	this.instance_2200.setTransform(457,161.75);

	this.instance_2201 = new lib.シンボル1();
	this.instance_2201.setTransform(438.5,148.25);

	this.instance_2202 = new lib.シンボル1();
	this.instance_2202.setTransform(252.5,101.55);

	this.instance_2203 = new lib.シンボル1();
	this.instance_2203.setTransform(234,88.05);

	this.instance_2204 = new lib.シンボル1();
	this.instance_2204.setTransform(344,161.75);

	this.instance_2205 = new lib.シンボル1();
	this.instance_2205.setTransform(325.5,148.25);

	this.instance_2206 = new lib.シンボル1();
	this.instance_2206.setTransform(139.5,101.55);

	this.instance_2207 = new lib.シンボル1();
	this.instance_2207.setTransform(121,88.05);

	this.instance_2208 = new lib.シンボル1();
	this.instance_2208.setTransform(578.5,83.05);

	this.instance_2209 = new lib.シンボル1();
	this.instance_2209.setTransform(560,69.55);

	this.instance_2210 = new lib.シンボル1();
	this.instance_2210.setTransform(531,36.35);

	this.instance_2211 = new lib.シンボル1();
	this.instance_2211.setTransform(512.5,22.85);

	this.instance_2212 = new lib.シンボル1();
	this.instance_2212.setTransform(465.5,83.05);

	this.instance_2213 = new lib.シンボル1();
	this.instance_2213.setTransform(447,69.55);

	this.instance_2214 = new lib.シンボル1();
	this.instance_2214.setTransform(418,36.35);

	this.instance_2215 = new lib.シンボル1();
	this.instance_2215.setTransform(399.5,22.85);

	this.instance_2216 = new lib.シンボル1();
	this.instance_2216.setTransform(442,48.05);

	this.instance_2217 = new lib.シンボル1();
	this.instance_2217.setTransform(423.5,34.55);

	this.instance_2218 = new lib.シンボル1();
	this.instance_2218.setTransform(394.5,1.35);

	this.instance_2219 = new lib.シンボル1();
	this.instance_2219.setTransform(376,-12.15);

	this.instance_2220 = new lib.シンボル1();
	this.instance_2220.setTransform(486,61.55);

	this.instance_2221 = new lib.シンボル1();
	this.instance_2221.setTransform(467.5,48.05);

	this.instance_2222 = new lib.シンボル1();
	this.instance_2222.setTransform(281.5,1.35);

	this.instance_2223 = new lib.シンボル1();
	this.instance_2223.setTransform(263,-12.15);

	this.instance_2224 = new lib.シンボル1();
	this.instance_2224.setTransform(541.5,143.25);

	this.instance_2225 = new lib.シンボル1();
	this.instance_2225.setTransform(523,129.75);

	this.instance_2226 = new lib.シンボル1();
	this.instance_2226.setTransform(494,96.55);

	this.instance_2227 = new lib.シンボル1();
	this.instance_2227.setTransform(475.5,83.05);

	this.instance_2228 = new lib.シンボル1();
	this.instance_2228.setTransform(428.5,143.25);

	this.instance_2229 = new lib.シンボル1();
	this.instance_2229.setTransform(567,143.25);

	this.instance_2230 = new lib.シンボル1();
	this.instance_2230.setTransform(381,96.55);

	this.instance_2231 = new lib.シンボル1();
	this.instance_2231.setTransform(362.5,83.05);

	this.instance_2232 = new lib.シンボル1();
	this.instance_2232.setTransform(562,121.75);

	this.instance_2233 = new lib.シンボル1();
	this.instance_2233.setTransform(543.5,108.25);

	this.instance_2234 = new lib.シンボル1();
	this.instance_2234.setTransform(357.5,61.55);

	this.instance_2235 = new lib.シンボル1();
	this.instance_2235.setTransform(339,48.05);

	this.instance_2236 = new lib.シンボル1();
	this.instance_2236.setTransform(449,121.75);

	this.instance_2237 = new lib.シンボル1();
	this.instance_2237.setTransform(430.5,108.25);

	this.instance_2238 = new lib.シンボル1();
	this.instance_2238.setTransform(244.5,61.55);

	this.instance_2239 = new lib.シンボル1();
	this.instance_2239.setTransform(226,48.05);

	this.instance_2240 = new lib.シンボル1();
	this.instance_2240.setTransform(535,150.05);

	this.instance_2241 = new lib.シンボル1();
	this.instance_2241.setTransform(516.5,136.55);

	this.instance_2242 = new lib.シンボル1();
	this.instance_2242.setTransform(330.5,89.85);

	this.instance_2243 = new lib.シンボル1();
	this.instance_2243.setTransform(312,76.35);

	this.instance_2244 = new lib.シンボル1();
	this.instance_2244.setTransform(422,150.05);

	this.instance_2245 = new lib.シンボル1();
	this.instance_2245.setTransform(403.5,136.55);

	this.instance_2246 = new lib.シンボル1();
	this.instance_2246.setTransform(217.5,89.85);

	this.instance_2247 = new lib.シンボル1();
	this.instance_2247.setTransform(199,76.35);

	this.instance_2248 = new lib.シンボル1();
	this.instance_2248.setTransform(398.5,115.05);

	this.instance_2249 = new lib.シンボル1();
	this.instance_2249.setTransform(380,101.55);

	this.instance_2250 = new lib.シンボル1();
	this.instance_2250.setTransform(194,54.85);

	this.instance_2251 = new lib.シンボル1();
	this.instance_2251.setTransform(175.5,41.35);

	this.instance_2252 = new lib.シンボル1();
	this.instance_2252.setTransform(285.5,115.05);

	this.instance_2253 = new lib.シンボル1();
	this.instance_2253.setTransform(267,101.55);

	this.instance_2254 = new lib.シンボル1();
	this.instance_2254.setTransform(81,54.85);

	this.instance_2255 = new lib.シンボル1();
	this.instance_2255.setTransform(62.5,41.35);

	this.instance_2256 = new lib.シンボル1();
	this.instance_2256.setTransform(498,210.25);

	this.instance_2257 = new lib.シンボル1();
	this.instance_2257.setTransform(479.5,196.75);

	this.instance_2258 = new lib.シンボル1();
	this.instance_2258.setTransform(293.5,150.05);

	this.instance_2259 = new lib.シンボル1();
	this.instance_2259.setTransform(275,136.55);

	this.instance_2260 = new lib.シンボル1();
	this.instance_2260.setTransform(385,210.25);

	this.instance_2261 = new lib.シンボル1();
	this.instance_2261.setTransform(366.5,196.75);

	this.instance_2262 = new lib.シンボル1();
	this.instance_2262.setTransform(180.5,150.05);

	this.instance_2263 = new lib.シンボル1();
	this.instance_2263.setTransform(162,136.55);

	this.instance_2264 = new lib.シンボル1();
	this.instance_2264.setTransform(361.5,175.25);

	this.instance_2265 = new lib.シンボル1();
	this.instance_2265.setTransform(343,161.75);

	this.instance_2266 = new lib.シンボル1();
	this.instance_2266.setTransform(157,115.05);

	this.instance_2267 = new lib.シンボル1();
	this.instance_2267.setTransform(138.5,101.55);

	this.instance_2268 = new lib.シンボル1();
	this.instance_2268.setTransform(248.5,175.25);

	this.instance_2269 = new lib.シンボル1();
	this.instance_2269.setTransform(230,161.75);

	this.instance_2270 = new lib.シンボル1();
	this.instance_2270.setTransform(70,153.55,1,1,0,0,180);

	this.instance_2271 = new lib.シンボル1();
	this.instance_2271.setTransform(88.5,140.05,1,1,0,0,180);

	this.instance_2272 = new lib.シンボル1();
	this.instance_2272.setTransform(483,96.55);

	this.instance_2273 = new lib.シンボル1();
	this.instance_2273.setTransform(464.5,83.05);

	this.instance_2274 = new lib.シンボル1();
	this.instance_2274.setTransform(435.5,49.85);

	this.instance_2275 = new lib.シンボル1();
	this.instance_2275.setTransform(417,36.35);

	this.instance_2276 = new lib.シンボル1();
	this.instance_2276.setTransform(527,110.05);

	this.instance_2277 = new lib.シンボル1();
	this.instance_2277.setTransform(508.5,96.55);

	this.instance_2278 = new lib.シンボル1();
	this.instance_2278.setTransform(322.5,49.85);

	this.instance_2279 = new lib.シンボル1();
	this.instance_2279.setTransform(304,36.35);

	this.instance_2280 = new lib.シンボル1();
	this.instance_2280.setTransform(503.5,75.05);

	this.instance_2281 = new lib.シンボル1();
	this.instance_2281.setTransform(485,61.55);

	this.instance_2282 = new lib.シンボル1();
	this.instance_2282.setTransform(299,14.85);

	this.instance_2283 = new lib.シンボル1();
	this.instance_2283.setTransform(280.5,1.35);

	this.instance_2284 = new lib.シンボル1();
	this.instance_2284.setTransform(390.5,75.05);

	this.instance_2285 = new lib.シンボル1();
	this.instance_2285.setTransform(372,61.55);

	this.instance_2286 = new lib.シンボル1();
	this.instance_2286.setTransform(186,14.85);

	this.instance_2287 = new lib.シンボル1();
	this.instance_2287.setTransform(167.5,1.35);

	this.instance_2288 = new lib.シンボル1();
	this.instance_2288.setTransform(446,156.75);

	this.instance_2289 = new lib.シンボル1();
	this.instance_2289.setTransform(427.5,143.25);

	this.instance_2290 = new lib.シンボル1();
	this.instance_2290.setTransform(398.5,110.05);

	this.instance_2291 = new lib.シンボル1();
	this.instance_2291.setTransform(380,96.55);

	this.instance_2292 = new lib.シンボル1();
	this.instance_2292.setTransform(490,170.25);

	this.instance_2293 = new lib.シンボル1();
	this.instance_2293.setTransform(471.5,156.75);

	this.instance_2294 = new lib.シンボル1();
	this.instance_2294.setTransform(285.5,110.05);

	this.instance_2295 = new lib.シンボル1();
	this.instance_2295.setTransform(267,96.55);

	this.instance_2296 = new lib.シンボル1();
	this.instance_2296.setTransform(466.5,135.25);

	this.instance_2297 = new lib.シンボル1();
	this.instance_2297.setTransform(448,121.75);

	this.instance_2298 = new lib.シンボル1();
	this.instance_2298.setTransform(262,75.05);

	this.instance_2299 = new lib.シンボル1();
	this.instance_2299.setTransform(243.5,61.55);

	this.instance_2300 = new lib.シンボル1();
	this.instance_2300.setTransform(353.5,135.25);

	this.instance_2301 = new lib.シンボル1();
	this.instance_2301.setTransform(335,121.75);

	this.instance_2302 = new lib.シンボル1();
	this.instance_2302.setTransform(149,75.05);

	this.instance_2303 = new lib.シンボル1();
	this.instance_2303.setTransform(130.5,61.55);

	this.instance_2304 = new lib.シンボル1();
	this.instance_2304.setTransform(472.5,173.05);

	this.instance_2305 = new lib.シンボル1();
	this.instance_2305.setTransform(454,159.55);

	this.instance_2306 = new lib.シンボル1();
	this.instance_2306.setTransform(268,112.85);

	this.instance_2307 = new lib.シンボル1();
	this.instance_2307.setTransform(249.5,99.35);

	this.instance_2308 = new lib.シンボル1();
	this.instance_2308.setTransform(359.5,173.05);

	this.instance_2309 = new lib.シンボル1();
	this.instance_2309.setTransform(341,159.55);

	this.instance_2310 = new lib.シンボル1();
	this.instance_2310.setTransform(155,112.85);

	this.instance_2311 = new lib.シンボル1();
	this.instance_2311.setTransform(136.5,99.35);

	this.instance_2312 = new lib.シンボル1();
	this.instance_2312.setTransform(336,138.05);

	this.instance_2313 = new lib.シンボル1();
	this.instance_2313.setTransform(317.5,124.55);

	this.instance_2314 = new lib.シンボル1();
	this.instance_2314.setTransform(131.5,77.85);

	this.instance_2315 = new lib.シンボル1();
	this.instance_2315.setTransform(113,64.35);

	this.instance_2316 = new lib.シンボル1();
	this.instance_2316.setTransform(223,138.05);

	this.instance_2317 = new lib.シンボル1();
	this.instance_2317.setTransform(204.5,124.55);

	this.instance_2318 = new lib.シンボル1();
	this.instance_2318.setTransform(95.5,116.35,1,1,0,0,180);

	this.instance_2319 = new lib.シンボル1();
	this.instance_2319.setTransform(114,102.85,1,1,0,0,180);

	this.instance_2320 = new lib.シンボル1();
	this.instance_2320.setTransform(435.5,233.25);

	this.instance_2321 = new lib.シンボル1();
	this.instance_2321.setTransform(417,219.75);

	this.instance_2322 = new lib.シンボル1();
	this.instance_2322.setTransform(231,173.05);

	this.instance_2323 = new lib.シンボル1();
	this.instance_2323.setTransform(212.5,159.55);

	this.instance_2324 = new lib.シンボル1();
	this.instance_2324.setTransform(322.5,233.25);

	this.instance_2325 = new lib.シンボル1();
	this.instance_2325.setTransform(304,219.75);

	this.instance_2326 = new lib.シンボル1();
	this.instance_2326.setTransform(118,173.05);

	this.instance_2327 = new lib.シンボル1();
	this.instance_2327.setTransform(99.5,159.55);

	this.instance_2328 = new lib.シンボル1();
	this.instance_2328.setTransform(299,198.25);

	this.instance_2329 = new lib.シンボル1();
	this.instance_2329.setTransform(280.5,184.75);

	this.instance_2330 = new lib.シンボル1();
	this.instance_2330.setTransform(94.5,138.05);

	this.instance_2331 = new lib.シンボル1();
	this.instance_2331.setTransform(76,124.55);

	this.instance_2332 = new lib.シンボル1();
	this.instance_2332.setTransform(186,198.25);

	this.instance_2333 = new lib.シンボル1();
	this.instance_2333.setTransform(167.5,184.75);

	this.instance_2334 = new lib.シンボル1();
	this.instance_2334.setTransform(132.5,176.55,1,1,0,0,180);

	this.instance_2335 = new lib.シンボル1();
	this.instance_2335.setTransform(151,163.05,1,1,0,0,180);

	this.instance_2336 = new lib.シンボル1();
	this.instance_2336.setTransform(420.5,119.55);

	this.instance_2337 = new lib.シンボル1();
	this.instance_2337.setTransform(559,119.55);

	this.instance_2338 = new lib.シンボル1();
	this.instance_2338.setTransform(373,72.85);

	this.instance_2339 = new lib.シンボル1();
	this.instance_2339.setTransform(354.5,59.35);

	this.instance_2340 = new lib.シンボル1();
	this.instance_2340.setTransform(464.5,133.05);

	this.instance_2341 = new lib.シンボル1();
	this.instance_2341.setTransform(446,119.55);

	this.instance_2342 = new lib.シンボル1();
	this.instance_2342.setTransform(260,72.85);

	this.instance_2343 = new lib.シンボル1();
	this.instance_2343.setTransform(241.5,59.35);

	this.instance_2344 = new lib.シンボル1();
	this.instance_2344.setTransform(441,98.05);

	this.instance_2345 = new lib.シンボル1();
	this.instance_2345.setTransform(422.5,84.55);

	this.instance_2346 = new lib.シンボル1();
	this.instance_2346.setTransform(236.5,37.85);

	this.instance_2347 = new lib.シンボル1();
	this.instance_2347.setTransform(218,24.35);

	this.instance_2348 = new lib.シンボル1();
	this.instance_2348.setTransform(328,98.05);

	this.instance_2349 = new lib.シンボル1();
	this.instance_2349.setTransform(309.5,84.55);

	this.instance_2350 = new lib.シンボル1();
	this.instance_2350.setTransform(123.5,37.85);

	this.instance_2351 = new lib.シンボル1();
	this.instance_2351.setTransform(105,24.35);

	this.instance_2352 = new lib.シンボル1();
	this.instance_2352.setTransform(540.5,193.25);

	this.instance_2353 = new lib.シンボル1();
	this.instance_2353.setTransform(522,179.75);

	this.instance_2354 = new lib.シンボル1();
	this.instance_2354.setTransform(336,133.05);

	this.instance_2355 = new lib.シンボル1();
	this.instance_2355.setTransform(317.5,119.55);

	this.instance_2356 = new lib.シンボル1();
	this.instance_2356.setTransform(427.5,193.25);

	this.instance_2357 = new lib.シンボル1();
	this.instance_2357.setTransform(409,179.75);

	this.instance_2358 = new lib.シンボル1();
	this.instance_2358.setTransform(223,133.05);

	this.instance_2359 = new lib.シンボル1();
	this.instance_2359.setTransform(204.5,119.55);

	this.instance_2360 = new lib.シンボル1();
	this.instance_2360.setTransform(404,158.25);

	this.instance_2361 = new lib.シンボル1();
	this.instance_2361.setTransform(385.5,144.75);

	this.instance_2362 = new lib.シンボル1();
	this.instance_2362.setTransform(199.5,98.05);

	this.instance_2363 = new lib.シンボル1();
	this.instance_2363.setTransform(181,84.55);

	this.instance_2364 = new lib.シンボル1();
	this.instance_2364.setTransform(291,158.25);

	this.instance_2365 = new lib.シンボル1();
	this.instance_2365.setTransform(272.5,144.75);

	this.instance_2366 = new lib.シンボル1();
	this.instance_2366.setTransform(86.5,98.05);

	this.instance_2367 = new lib.シンボル1();
	this.instance_2367.setTransform(68,84.55);

	this.instance_2368 = new lib.シンボル1();
	this.instance_2368.setTransform(377,186.55);

	this.instance_2369 = new lib.シンボル1();
	this.instance_2369.setTransform(358.5,173.05);

	this.instance_2370 = new lib.シンボル1();
	this.instance_2370.setTransform(172.5,126.35);

	this.instance_2371 = new lib.シンボル1();
	this.instance_2371.setTransform(154,112.85);

	this.instance_2372 = new lib.シンボル1();
	this.instance_2372.setTransform(264,186.55);

	this.instance_2373 = new lib.シンボル1();
	this.instance_2373.setTransform(245.5,173.05);

	this.instance_2374 = new lib.シンボル1();
	this.instance_2374.setTransform(59.5,126.35);

	this.instance_2375 = new lib.シンボル1();
	this.instance_2375.setTransform(73,151.35,1,1,0,0,180);

	this.instance_2376 = new lib.シンボル1();
	this.instance_2376.setTransform(240.5,151.55);

	this.instance_2377 = new lib.シンボル1();
	this.instance_2377.setTransform(222,138.05);

	this.instance_2378 = new lib.シンボル1();
	this.instance_2378.setTransform(78,129.85,1,1,0,0,180);

	this.instance_2379 = new lib.シンボル1();
	this.instance_2379.setTransform(96.5,116.35,1,1,0,0,180);

	this.instance_2380 = new lib.シンボル1();
	this.instance_2380.setTransform(127.5,151.55);

	this.instance_2381 = new lib.シンボル1();
	this.instance_2381.setTransform(109,138.05);

	this.instance_2382 = new lib.シンボル1();
	this.instance_2382.setTransform(191,129.85,1,1,0,0,180);

	this.instance_2383 = new lib.シンボル1();
	this.instance_2383.setTransform(209.5,116.35,1,1,0,0,180);

	this.instance_2384 = new lib.シンボル1();
	this.instance_2384.setTransform(340,246.75);

	this.instance_2385 = new lib.シンボル1();
	this.instance_2385.setTransform(321.5,233.25);

	this.instance_2386 = new lib.シンボル1();
	this.instance_2386.setTransform(135.5,186.55);

	this.instance_2387 = new lib.シンボル1();
	this.instance_2387.setTransform(117,173.05);

	this.instance_2388 = new lib.シンボル1();
	this.instance_2388.setTransform(227,246.75);

	this.instance_2389 = new lib.シンボル1();
	this.instance_2389.setTransform(208.5,233.25);

	this.instance_2390 = new lib.シンボル1();
	this.instance_2390.setTransform(91.5,225.05,1,1,0,0,180);

	this.instance_2391 = new lib.シンボル1();
	this.instance_2391.setTransform(110,211.55,1,1,0,0,180);

	this.instance_2392 = new lib.シンボル1();
	this.instance_2392.setTransform(203.5,211.75);

	this.instance_2393 = new lib.シンボル1();
	this.instance_2393.setTransform(185,198.25);

	this.instance_2394 = new lib.シンボル1();
	this.instance_2394.setTransform(115,190.05,1,1,0,0,180);

	this.instance_2395 = new lib.シンボル1();
	this.instance_2395.setTransform(133.5,176.55,1,1,0,0,180);

	this.instance_2396 = new lib.シンボル1();
	this.instance_2396.setTransform(90.5,211.75);

	this.instance_2397 = new lib.シンボル1();
	this.instance_2397.setTransform(72,198.25);

	this.instance_2398 = new lib.シンボル1();
	this.instance_2398.setTransform(228,190.05,1,1,0,0,180);

	this.instance_2399 = new lib.シンボル1();
	this.instance_2399.setTransform(246.5,176.55,1,1,0,0,180);

	this.instance_2400 = new lib.シンボル1();
	this.instance_2400.setTransform(482,146.55);

	this.instance_2401 = new lib.シンボル1();
	this.instance_2401.setTransform(463.5,133.05);

	this.instance_2402 = new lib.シンボル1();
	this.instance_2402.setTransform(277.5,86.35);

	this.instance_2403 = new lib.シンボル1();
	this.instance_2403.setTransform(259,72.85);

	this.instance_2404 = new lib.シンボル1();
	this.instance_2404.setTransform(369,146.55);

	this.instance_2405 = new lib.シンボル1();
	this.instance_2405.setTransform(350.5,133.05);

	this.instance_2406 = new lib.シンボル1();
	this.instance_2406.setTransform(164.5,86.35);

	this.instance_2407 = new lib.シンボル1();
	this.instance_2407.setTransform(146,72.85);

	this.instance_2408 = new lib.シンボル1();
	this.instance_2408.setTransform(345.5,111.55);

	this.instance_2409 = new lib.シンボル1();
	this.instance_2409.setTransform(327,98.05);

	this.instance_2410 = new lib.シンボル1();
	this.instance_2410.setTransform(141,51.35);

	this.instance_2411 = new lib.シンボル1();
	this.instance_2411.setTransform(122.5,37.85);

	this.instance_2412 = new lib.シンボル1();
	this.instance_2412.setTransform(232.5,111.55);

	this.instance_2413 = new lib.シンボル1();
	this.instance_2413.setTransform(214,98.05);

	this.instance_2414 = new lib.シンボル1();
	this.instance_2414.setTransform(86,89.85,1,1,0,0,180);

	this.instance_2415 = new lib.シンボル1();
	this.instance_2415.setTransform(104.5,76.35,1,1,0,0,180);

	this.instance_2416 = new lib.シンボル1();
	this.instance_2416.setTransform(445,206.75);

	this.instance_2417 = new lib.シンボル1();
	this.instance_2417.setTransform(426.5,193.25);

	this.instance_2418 = new lib.シンボル1();
	this.instance_2418.setTransform(240.5,146.55);

	this.instance_2419 = new lib.シンボル1();
	this.instance_2419.setTransform(222,133.05);

	this.instance_2420 = new lib.シンボル1();
	this.instance_2420.setTransform(332,206.75);

	this.instance_2421 = new lib.シンボル1();
	this.instance_2421.setTransform(313.5,193.25);

	this.instance_2422 = new lib.シンボル1();
	this.instance_2422.setTransform(127.5,146.55);

	this.instance_2423 = new lib.シンボル1();
	this.instance_2423.setTransform(109,133.05);

	this.instance_2424 = new lib.シンボル1();
	this.instance_2424.setTransform(308.5,171.75);

	this.instance_2425 = new lib.シンボル1();
	this.instance_2425.setTransform(290,158.25);

	this.instance_2426 = new lib.シンボル1();
	this.instance_2426.setTransform(104,111.55);

	this.instance_2427 = new lib.シンボル1();
	this.instance_2427.setTransform(85.5,98.05);

	this.instance_2428 = new lib.シンボル1();
	this.instance_2428.setTransform(195.5,171.75);

	this.instance_2429 = new lib.シンボル1();
	this.instance_2429.setTransform(177,158.25);

	this.instance_2430 = new lib.シンボル1();
	this.instance_2430.setTransform(123,150.05,1,1,0,0,180);

	this.instance_2431 = new lib.シンボル1();
	this.instance_2431.setTransform(141.5,136.55,1,1,0,0,180);

	this.instance_2432 = new lib.シンボル1();
	this.instance_2432.setTransform(560.5,150.05);

	this.instance_2433 = new lib.シンボル1();
	this.instance_2433.setTransform(542,136.55);

	this.instance_2434 = new lib.シンボル1();
	this.instance_2434.setTransform(356,89.85);

	this.instance_2435 = new lib.シンボル1();
	this.instance_2435.setTransform(337.5,76.35);

	this.instance_2436 = new lib.シンボル1();
	this.instance_2436.setTransform(447.5,150.05);

	this.instance_2437 = new lib.シンボル1();
	this.instance_2437.setTransform(429,136.55);

	this.instance_2438 = new lib.シンボル1();
	this.instance_2438.setTransform(243,89.85);

	this.instance_2439 = new lib.シンボル1();
	this.instance_2439.setTransform(224.5,76.35);

	this.instance_2440 = new lib.シンボル1();
	this.instance_2440.setTransform(424,115.05);

	this.instance_2441 = new lib.シンボル1();
	this.instance_2441.setTransform(405.5,101.55);

	this.instance_2442 = new lib.シンボル1();
	this.instance_2442.setTransform(219.5,54.85);

	this.instance_2443 = new lib.シンボル1();
	this.instance_2443.setTransform(201,41.35);

	this.instance_2444 = new lib.シンボル1();
	this.instance_2444.setTransform(311,115.05);

	this.instance_2445 = new lib.シンボル1();
	this.instance_2445.setTransform(292.5,101.55);

	this.instance_2446 = new lib.シンボル1();
	this.instance_2446.setTransform(106.5,54.85);

	this.instance_2447 = new lib.シンボル1();
	this.instance_2447.setTransform(88,41.35);

	this.instance_2448 = new lib.シンボル1();
	this.instance_2448.setTransform(523.5,210.25);

	this.instance_2449 = new lib.シンボル1();
	this.instance_2449.setTransform(505,196.75);

	this.instance_2450 = new lib.シンボル1();
	this.instance_2450.setTransform(319,150.05);

	this.instance_2451 = new lib.シンボル1();
	this.instance_2451.setTransform(300.5,136.55);

	this.instance_2452 = new lib.シンボル1();
	this.instance_2452.setTransform(410.5,210.25);

	this.instance_2453 = new lib.シンボル1();
	this.instance_2453.setTransform(392,196.75);

	this.instance_2454 = new lib.シンボル1();
	this.instance_2454.setTransform(206,150.05);

	this.instance_2455 = new lib.シンボル1();
	this.instance_2455.setTransform(187.5,136.55);

	this.instance_2456 = new lib.シンボル1();
	this.instance_2456.setTransform(387,175.25);

	this.instance_2457 = new lib.シンボル1();
	this.instance_2457.setTransform(368.5,161.75);

	this.instance_2458 = new lib.シンボル1();
	this.instance_2458.setTransform(182.5,115.05);

	this.instance_2459 = new lib.シンボル1();
	this.instance_2459.setTransform(164,101.55);

	this.instance_2460 = new lib.シンボル1();
	this.instance_2460.setTransform(274,175.25);

	this.instance_2461 = new lib.シンボル1();
	this.instance_2461.setTransform(255.5,161.75);

	this.instance_2462 = new lib.シンボル1();
	this.instance_2462.setTransform(69.5,115.05);

	this.instance_2463 = new lib.シンボル1();
	this.instance_2463.setTransform(63,140.05,1,1,0,0,180);

	this.instance_2464 = new lib.シンボル1();
	this.instance_2464.setTransform(508.5,96.55);

	this.instance_2465 = new lib.シンボル1();
	this.instance_2465.setTransform(490,83.05);

	this.instance_2466 = new lib.シンボル1();
	this.instance_2466.setTransform(461,49.85);

	this.instance_2467 = new lib.シンボル1();
	this.instance_2467.setTransform(442.5,36.35);

	this.instance_2468 = new lib.シンボル1();
	this.instance_2468.setTransform(552.5,110.05);

	this.instance_2469 = new lib.シンボル1();
	this.instance_2469.setTransform(534,96.55);

	this.instance_2470 = new lib.シンボル1();
	this.instance_2470.setTransform(348,49.85);

	this.instance_2471 = new lib.シンボル1();
	this.instance_2471.setTransform(329.5,36.35);

	this.instance_2472 = new lib.シンボル1();
	this.instance_2472.setTransform(529,75.05);

	this.instance_2473 = new lib.シンボル1();
	this.instance_2473.setTransform(510.5,61.55);

	this.instance_2474 = new lib.シンボル1();
	this.instance_2474.setTransform(324.5,14.85);

	this.instance_2475 = new lib.シンボル1();
	this.instance_2475.setTransform(306,1.35);

	this.instance_2476 = new lib.シンボル1();
	this.instance_2476.setTransform(416,75.05);

	this.instance_2477 = new lib.シンボル1();
	this.instance_2477.setTransform(397.5,61.55);

	this.instance_2478 = new lib.シンボル1();
	this.instance_2478.setTransform(211.5,14.85);

	this.instance_2479 = new lib.シンボル1();
	this.instance_2479.setTransform(193,1.35);

	this.instance_2480 = new lib.シンボル1();
	this.instance_2480.setTransform(471.5,156.75);

	this.instance_2481 = new lib.シンボル1();
	this.instance_2481.setTransform(453,143.25);

	this.instance_2482 = new lib.シンボル1();
	this.instance_2482.setTransform(424,110.05);

	this.instance_2483 = new lib.シンボル1();
	this.instance_2483.setTransform(405.5,96.55);

	this.instance_2484 = new lib.シンボル1();
	this.instance_2484.setTransform(515.5,170.25);

	this.instance_2485 = new lib.シンボル1();
	this.instance_2485.setTransform(497,156.75);

	this.instance_2486 = new lib.シンボル1();
	this.instance_2486.setTransform(311,110.05);

	this.instance_2487 = new lib.シンボル1();
	this.instance_2487.setTransform(292.5,96.55);

	this.instance_2488 = new lib.シンボル1();
	this.instance_2488.setTransform(492,135.25);

	this.instance_2489 = new lib.シンボル1();
	this.instance_2489.setTransform(473.5,121.75);

	this.instance_2490 = new lib.シンボル1();
	this.instance_2490.setTransform(287.5,75.05);

	this.instance_2491 = new lib.シンボル1();
	this.instance_2491.setTransform(269,61.55);

	this.instance_2492 = new lib.シンボル1();
	this.instance_2492.setTransform(379,135.25);

	this.instance_2493 = new lib.シンボル1();
	this.instance_2493.setTransform(360.5,121.75);

	this.instance_2494 = new lib.シンボル1();
	this.instance_2494.setTransform(174.5,75.05);

	this.instance_2495 = new lib.シンボル1();
	this.instance_2495.setTransform(156,61.55);

	this.instance_2496 = new lib.シンボル1();
	this.instance_2496.setTransform(465,163.55);

	this.instance_2497 = new lib.シンボル1();
	this.instance_2497.setTransform(446.5,150.05);

	this.instance_2498 = new lib.シンボル1();
	this.instance_2498.setTransform(260.5,103.35);

	this.instance_2499 = new lib.シンボル1();
	this.instance_2499.setTransform(242,89.85);

	this.instance_2500 = new lib.シンボル1();
	this.instance_2500.setTransform(352,163.55);

	this.instance_2501 = new lib.シンボル1();
	this.instance_2501.setTransform(333.5,150.05);

	this.instance_2502 = new lib.シンボル1();
	this.instance_2502.setTransform(147.5,103.35);

	this.instance_2503 = new lib.シンボル1();
	this.instance_2503.setTransform(129,89.85);

	this.instance_2504 = new lib.シンボル1();
	this.instance_2504.setTransform(328.5,128.55);

	this.instance_2505 = new lib.シンボル1();
	this.instance_2505.setTransform(310,115.05);

	this.instance_2506 = new lib.シンボル1();
	this.instance_2506.setTransform(124,68.35);

	this.instance_2507 = new lib.シンボル1();
	this.instance_2507.setTransform(105.5,54.85);

	this.instance_2508 = new lib.シンボル1();
	this.instance_2508.setTransform(215.5,128.55);

	this.instance_2509 = new lib.シンボル1();
	this.instance_2509.setTransform(197,115.05);

	this.instance_2510 = new lib.シンボル1();
	this.instance_2510.setTransform(103,106.85,1,1,0,0,180);

	this.instance_2511 = new lib.シンボル1();
	this.instance_2511.setTransform(121.5,93.35,1,1,0,0,180);

	this.instance_2512 = new lib.シンボル1();
	this.instance_2512.setTransform(428,223.75);

	this.instance_2513 = new lib.シンボル1();
	this.instance_2513.setTransform(409.5,210.25);

	this.instance_2514 = new lib.シンボル1();
	this.instance_2514.setTransform(223.5,163.55);

	this.instance_2515 = new lib.シンボル1();
	this.instance_2515.setTransform(205,150.05);

	this.instance_2516 = new lib.シンボル1();
	this.instance_2516.setTransform(315,223.75);

	this.instance_2517 = new lib.シンボル1();
	this.instance_2517.setTransform(296.5,210.25);

	this.instance_2518 = new lib.シンボル1();
	this.instance_2518.setTransform(110.5,163.55);

	this.instance_2519 = new lib.シンボル1();
	this.instance_2519.setTransform(92,150.05);

	this.instance_2520 = new lib.シンボル1();
	this.instance_2520.setTransform(291.5,188.75);

	this.instance_2521 = new lib.シンボル1();
	this.instance_2521.setTransform(273,175.25);

	this.instance_2522 = new lib.シンボル1();
	this.instance_2522.setTransform(87,128.55);

	this.instance_2523 = new lib.シンボル1();
	this.instance_2523.setTransform(68.5,115.05);

	this.instance_2524 = new lib.シンボル1();
	this.instance_2524.setTransform(178.5,188.75);

	this.instance_2525 = new lib.シンボル1();
	this.instance_2525.setTransform(160,175.25);

	this.instance_2526 = new lib.シンボル1();
	this.instance_2526.setTransform(140,167.05,1,1,0,0,180);

	this.instance_2527 = new lib.シンボル1();
	this.instance_2527.setTransform(158.5,153.55,1,1,0,0,180);

	this.instance_2528 = new lib.シンボル1();
	this.instance_2528.setTransform(570,123.55);

	this.instance_2529 = new lib.シンボル1();
	this.instance_2529.setTransform(551.5,110.05);

	this.instance_2530 = new lib.シンボル1();
	this.instance_2530.setTransform(365.5,63.35);

	this.instance_2531 = new lib.シンボル1();
	this.instance_2531.setTransform(347,49.85);

	this.instance_2532 = new lib.シンボル1();
	this.instance_2532.setTransform(457,123.55);

	this.instance_2533 = new lib.シンボル1();
	this.instance_2533.setTransform(438.5,110.05);

	this.instance_2534 = new lib.シンボル1();
	this.instance_2534.setTransform(252.5,63.35);

	this.instance_2535 = new lib.シンボル1();
	this.instance_2535.setTransform(234,49.85);

	this.instance_2536 = new lib.シンボル1();
	this.instance_2536.setTransform(433.5,88.55);

	this.instance_2537 = new lib.シンボル1();
	this.instance_2537.setTransform(415,75.05);

	this.instance_2538 = new lib.シンボル1();
	this.instance_2538.setTransform(229,28.35);

	this.instance_2539 = new lib.シンボル1();
	this.instance_2539.setTransform(210.5,14.85);

	this.instance_2540 = new lib.シンボル1();
	this.instance_2540.setTransform(320.5,88.55);

	this.instance_2541 = new lib.シンボル1();
	this.instance_2541.setTransform(302,75.05);

	this.instance_2542 = new lib.シンボル1();
	this.instance_2542.setTransform(116,28.35);

	this.instance_2543 = new lib.シンボル1();
	this.instance_2543.setTransform(97.5,14.85);

	this.instance_2544 = new lib.シンボル1();
	this.instance_2544.setTransform(533,183.75);

	this.instance_2545 = new lib.シンボル1();
	this.instance_2545.setTransform(514.5,170.25);

	this.instance_2546 = new lib.シンボル1();
	this.instance_2546.setTransform(328.5,123.55);

	this.instance_2547 = new lib.シンボル1();
	this.instance_2547.setTransform(310,110.05);

	this.instance_2548 = new lib.シンボル1();
	this.instance_2548.setTransform(420,183.75);

	this.instance_2549 = new lib.シンボル1();
	this.instance_2549.setTransform(401.5,170.25);

	this.instance_2550 = new lib.シンボル1();
	this.instance_2550.setTransform(215.5,123.55);

	this.instance_2551 = new lib.シンボル1();
	this.instance_2551.setTransform(197,110.05);

	this.instance_2552 = new lib.シンボル1();
	this.instance_2552.setTransform(396.5,148.75);

	this.instance_2553 = new lib.シンボル1();
	this.instance_2553.setTransform(378,135.25);

	this.instance_2554 = new lib.シンボル1();
	this.instance_2554.setTransform(192,88.55);

	this.instance_2555 = new lib.シンボル1();
	this.instance_2555.setTransform(173.5,75.05);

	this.instance_2556 = new lib.シンボル1();
	this.instance_2556.setTransform(283.5,148.75);

	this.instance_2557 = new lib.シンボル1();
	this.instance_2557.setTransform(265,135.25);

	this.instance_2558 = new lib.シンボル1();
	this.instance_2558.setTransform(79,88.55);

	this.instance_2559 = new lib.シンボル1();
	this.instance_2559.setTransform(60.5,75.05);

	this.instance_2560 = new lib.シンボル1();
	this.instance_2560.setTransform(517.5,136.55);

	this.instance_2561 = new lib.シンボル1();
	this.instance_2561.setTransform(499,123.05);

	this.instance_2562 = new lib.シンボル1();
	this.instance_2562.setTransform(313,76.35);

	this.instance_2563 = new lib.シンボル1();
	this.instance_2563.setTransform(294.5,62.85);

	this.instance_2564 = new lib.シンボル1();
	this.instance_2564.setTransform(404.5,136.55);

	this.instance_2565 = new lib.シンボル1();
	this.instance_2565.setTransform(386,123.05);

	this.instance_2566 = new lib.シンボル1();
	this.instance_2566.setTransform(200,76.35);

	this.instance_2567 = new lib.シンボル1();
	this.instance_2567.setTransform(181.5,62.85);

	this.instance_2568 = new lib.シンボル1();
	this.instance_2568.setTransform(381,101.55);

	this.instance_2569 = new lib.シンボル1();
	this.instance_2569.setTransform(362.5,88.05);

	this.instance_2570 = new lib.シンボル1();
	this.instance_2570.setTransform(176.5,41.35);

	this.instance_2571 = new lib.シンボル1();
	this.instance_2571.setTransform(158,27.85);

	this.instance_2572 = new lib.シンボル1();
	this.instance_2572.setTransform(268,101.55);

	this.instance_2573 = new lib.シンボル1();
	this.instance_2573.setTransform(249.5,88.05);

	this.instance_2574 = new lib.シンボル1();
	this.instance_2574.setTransform(63.5,41.35);

	this.instance_2575 = new lib.シンボル1();
	this.instance_2575.setTransform(45,27.85);

	this.instance_2576 = new lib.シンボル1();
	this.instance_2576.setTransform(480.5,196.75);

	this.instance_2577 = new lib.シンボル1();
	this.instance_2577.setTransform(462,183.25);

	this.instance_2578 = new lib.シンボル1();
	this.instance_2578.setTransform(276,136.55);

	this.instance_2579 = new lib.シンボル1();
	this.instance_2579.setTransform(257.5,123.05);

	this.instance_2580 = new lib.シンボル1();
	this.instance_2580.setTransform(367.5,196.75);

	this.instance_2581 = new lib.シンボル1();
	this.instance_2581.setTransform(349,183.25);

	this.instance_2582 = new lib.シンボル1();
	this.instance_2582.setTransform(163,136.55);

	this.instance_2583 = new lib.シンボル1();
	this.instance_2583.setTransform(144.5,123.05);

	this.instance_2584 = new lib.シンボル1();
	this.instance_2584.setTransform(344,161.75);

	this.instance_2585 = new lib.シンボル1();
	this.instance_2585.setTransform(325.5,148.25);

	this.instance_2586 = new lib.シンボル1();
	this.instance_2586.setTransform(139.5,101.55);

	this.instance_2587 = new lib.シンボル1();
	this.instance_2587.setTransform(121,88.05);

	this.instance_2588 = new lib.シンボル1();
	this.instance_2588.setTransform(231,161.75);

	this.instance_2589 = new lib.シンボル1();
	this.instance_2589.setTransform(212.5,148.25);

	this.instance_2590 = new lib.シンボル1();
	this.instance_2590.setTransform(37.5,140.05,1,1,0,0,180);

	this.instance_2591 = new lib.シンボル1();
	this.instance_2591.setTransform(56,126.55,1,1,0,0,180);

	this.instance_2592 = new lib.シンボル1();
	this.instance_2592.setTransform(465.5,83.05);

	this.instance_2593 = new lib.シンボル1();
	this.instance_2593.setTransform(447,69.55);

	this.instance_2594 = new lib.シンボル1();
	this.instance_2594.setTransform(418,36.35);

	this.instance_2595 = new lib.シンボル1();
	this.instance_2595.setTransform(399.5,22.85);

	this.instance_2596 = new lib.シンボル1();
	this.instance_2596.setTransform(509.5,96.55);

	this.instance_2597 = new lib.シンボル1();
	this.instance_2597.setTransform(491,83.05);

	this.instance_2598 = new lib.シンボル1();
	this.instance_2598.setTransform(305,36.35);

	this.instance_2599 = new lib.シンボル1();
	this.instance_2599.setTransform(286.5,22.85);

	this.instance_2600 = new lib.シンボル1();
	this.instance_2600.setTransform(486,61.55);

	this.instance_2601 = new lib.シンボル1();
	this.instance_2601.setTransform(467.5,48.05);

	this.instance_2602 = new lib.シンボル1();
	this.instance_2602.setTransform(281.5,1.35);

	this.instance_2603 = new lib.シンボル1();
	this.instance_2603.setTransform(263,-12.15);

	this.instance_2604 = new lib.シンボル1();
	this.instance_2604.setTransform(373,61.55);

	this.instance_2605 = new lib.シンボル1();
	this.instance_2605.setTransform(354.5,48.05);

	this.instance_2606 = new lib.シンボル1();
	this.instance_2606.setTransform(168.5,1.35);

	this.instance_2607 = new lib.シンボル1();
	this.instance_2607.setTransform(150,-12.15);

	this.instance_2608 = new lib.シンボル1();
	this.instance_2608.setTransform(428.5,143.25);

	this.instance_2609 = new lib.シンボル1();
	this.instance_2609.setTransform(410,129.75);

	this.instance_2610 = new lib.シンボル1();
	this.instance_2610.setTransform(381,96.55);

	this.instance_2611 = new lib.シンボル1();
	this.instance_2611.setTransform(362.5,83.05);

	this.instance_2612 = new lib.シンボル1();
	this.instance_2612.setTransform(472.5,156.75);

	this.instance_2613 = new lib.シンボル1();
	this.instance_2613.setTransform(454,143.25);

	this.instance_2614 = new lib.シンボル1();
	this.instance_2614.setTransform(268,96.55);

	this.instance_2615 = new lib.シンボル1();
	this.instance_2615.setTransform(249.5,83.05);

	this.instance_2616 = new lib.シンボル1();
	this.instance_2616.setTransform(449,121.75);

	this.instance_2617 = new lib.シンボル1();
	this.instance_2617.setTransform(430.5,108.25);

	this.instance_2618 = new lib.シンボル1();
	this.instance_2618.setTransform(244.5,61.55);

	this.instance_2619 = new lib.シンボル1();
	this.instance_2619.setTransform(226,48.05);

	this.instance_2620 = new lib.シンボル1();
	this.instance_2620.setTransform(336,121.75);

	this.instance_2621 = new lib.シンボル1();
	this.instance_2621.setTransform(317.5,108.25);

	this.instance_2622 = new lib.シンボル1();
	this.instance_2622.setTransform(131.5,61.55);

	this.instance_2623 = new lib.シンボル1();
	this.instance_2623.setTransform(113,48.05);

	this.instance_2624 = new lib.シンボル1();
	this.instance_2624.setTransform(422,150.05);

	this.instance_2625 = new lib.シンボル1();
	this.instance_2625.setTransform(403.5,136.55);

	this.instance_2626 = new lib.シンボル1();
	this.instance_2626.setTransform(217.5,89.85);

	this.instance_2627 = new lib.シンボル1();
	this.instance_2627.setTransform(199,76.35);

	this.instance_2628 = new lib.シンボル1();
	this.instance_2628.setTransform(309,150.05);

	this.instance_2629 = new lib.シンボル1();
	this.instance_2629.setTransform(290.5,136.55);

	this.instance_2630 = new lib.シンボル1();
	this.instance_2630.setTransform(104.5,89.85);

	this.instance_2631 = new lib.シンボル1();
	this.instance_2631.setTransform(86,76.35);

	this.instance_2632 = new lib.シンボル1();
	this.instance_2632.setTransform(285.5,115.05);

	this.instance_2633 = new lib.シンボル1();
	this.instance_2633.setTransform(267,101.55);

	this.instance_2634 = new lib.シンボル1();
	this.instance_2634.setTransform(81,54.85);

	this.instance_2635 = new lib.シンボル1();
	this.instance_2635.setTransform(62.5,41.35);

	this.instance_2636 = new lib.シンボル1();
	this.instance_2636.setTransform(172.5,115.05);

	this.instance_2637 = new lib.シンボル1();
	this.instance_2637.setTransform(154,101.55);

	this.instance_2638 = new lib.シンボル1();
	this.instance_2638.setTransform(96,93.35,1,1,0,0,180);

	this.instance_2639 = new lib.シンボル1();
	this.instance_2639.setTransform(114.5,79.85,1,1,0,0,180);

	this.instance_2640 = new lib.シンボル1();
	this.instance_2640.setTransform(385,210.25);

	this.instance_2641 = new lib.シンボル1();
	this.instance_2641.setTransform(366.5,196.75);

	this.instance_2642 = new lib.シンボル1();
	this.instance_2642.setTransform(180.5,150.05);

	this.instance_2643 = new lib.シンボル1();
	this.instance_2643.setTransform(162,136.55);

	this.instance_2644 = new lib.シンボル1();
	this.instance_2644.setTransform(272,210.25);

	this.instance_2645 = new lib.シンボル1();
	this.instance_2645.setTransform(253.5,196.75);

	this.instance_2646 = new lib.シンボル1();
	this.instance_2646.setTransform(67.5,150.05);

	this.instance_2647 = new lib.シンボル1();
	this.instance_2647.setTransform(49,136.55);

	this.instance_2648 = new lib.シンボル1();
	this.instance_2648.setTransform(248.5,175.25);

	this.instance_2649 = new lib.シンボル1();
	this.instance_2649.setTransform(230,161.75);

	this.instance_2650 = new lib.シンボル1();
	this.instance_2650.setTransform(44,115.05);

	this.instance_2651 = new lib.シンボル1();
	this.instance_2651.setTransform(38.5,140.05,1,1,0,0,180);

	this.instance_2652 = new lib.シンボル1();
	this.instance_2652.setTransform(135.5,175.25);

	this.instance_2653 = new lib.シンボル1();
	this.instance_2653.setTransform(117,161.75);

	this.instance_2654 = new lib.シンボル1();
	this.instance_2654.setTransform(133,153.55,1,1,0,0,180);

	this.instance_2655 = new lib.シンボル1();
	this.instance_2655.setTransform(151.5,140.05,1,1,0,0,180);

	this.instance_2656 = new lib.シンボル1();
	this.instance_2656.setTransform(527,110.05);

	this.instance_2657 = new lib.シンボル1();
	this.instance_2657.setTransform(508.5,96.55);

	this.instance_2658 = new lib.シンボル1();
	this.instance_2658.setTransform(322.5,49.85);

	this.instance_2659 = new lib.シンボル1();
	this.instance_2659.setTransform(304,36.35);

	this.instance_2660 = new lib.シンボル1();
	this.instance_2660.setTransform(414,110.05);

	this.instance_2661 = new lib.シンボル1();
	this.instance_2661.setTransform(395.5,96.55);

	this.instance_2662 = new lib.シンボル1();
	this.instance_2662.setTransform(209.5,49.85);

	this.instance_2663 = new lib.シンボル1();
	this.instance_2663.setTransform(191,36.35);

	this.instance_2664 = new lib.シンボル1();
	this.instance_2664.setTransform(390.5,75.05);

	this.instance_2665 = new lib.シンボル1();
	this.instance_2665.setTransform(372,61.55);

	this.instance_2666 = new lib.シンボル1();
	this.instance_2666.setTransform(186,14.85);

	this.instance_2667 = new lib.シンボル1();
	this.instance_2667.setTransform(167.5,1.35);

	this.instance_2668 = new lib.シンボル1();
	this.instance_2668.setTransform(277.5,75.05);

	this.instance_2669 = new lib.シンボル1();
	this.instance_2669.setTransform(259,61.55);

	this.instance_2670 = new lib.シンボル1();
	this.instance_2670.setTransform(73,14.85);

	this.instance_2671 = new lib.シンボル1();
	this.instance_2671.setTransform(54.5,1.35);

	this.instance_2672 = new lib.シンボル1();
	this.instance_2672.setTransform(490,170.25);

	this.instance_2673 = new lib.シンボル1();
	this.instance_2673.setTransform(471.5,156.75);

	this.instance_2674 = new lib.シンボル1();
	this.instance_2674.setTransform(285.5,110.05);

	this.instance_2675 = new lib.シンボル1();
	this.instance_2675.setTransform(267,96.55);

	this.instance_2676 = new lib.シンボル1();
	this.instance_2676.setTransform(377,170.25);

	this.instance_2677 = new lib.シンボル1();
	this.instance_2677.setTransform(358.5,156.75);

	this.instance_2678 = new lib.シンボル1();
	this.instance_2678.setTransform(172.5,110.05);

	this.instance_2679 = new lib.シンボル1();
	this.instance_2679.setTransform(154,96.55);

	this.instance_2680 = new lib.シンボル1();
	this.instance_2680.setTransform(353.5,135.25);

	this.instance_2681 = new lib.シンボル1();
	this.instance_2681.setTransform(335,121.75);

	this.instance_2682 = new lib.シンボル1();
	this.instance_2682.setTransform(149,75.05);

	this.instance_2683 = new lib.シンボル1();
	this.instance_2683.setTransform(130.5,61.55);

	this.instance_2684 = new lib.シンボル1();
	this.instance_2684.setTransform(240.5,135.25);

	this.instance_2685 = new lib.シンボル1();
	this.instance_2685.setTransform(222,121.75);

	this.instance_2686 = new lib.シンボル1();
	this.instance_2686.setTransform(36,75.05);

	this.instance_2687 = new lib.シンボル1();
	this.instance_2687.setTransform(46.5,100.05,1,1,0,0,180);

	this.instance_2688 = new lib.シンボル1();
	this.instance_2688.setTransform(448.5,100.05);

	this.instance_2689 = new lib.シンボル1();
	this.instance_2689.setTransform(430,86.55);

	this.instance_2690 = new lib.シンボル1();
	this.instance_2690.setTransform(401,53.35);

	this.instance_2691 = new lib.シンボル1();
	this.instance_2691.setTransform(382.5,39.85);

	this.instance_2692 = new lib.シンボル1();
	this.instance_2692.setTransform(492.5,113.55);

	this.instance_2693 = new lib.シンボル1();
	this.instance_2693.setTransform(474,100.05);

	this.instance_2694 = new lib.シンボル1();
	this.instance_2694.setTransform(288,53.35);

	this.instance_2695 = new lib.シンボル1();
	this.instance_2695.setTransform(269.5,39.85);

	this.instance_2696 = new lib.シンボル1();
	this.instance_2696.setTransform(469,78.55);

	this.instance_2697 = new lib.シンボル1();
	this.instance_2697.setTransform(450.5,65.05);

	this.instance_2698 = new lib.シンボル1();
	this.instance_2698.setTransform(264.5,18.35);

	this.instance_2699 = new lib.シンボル1();
	this.instance_2699.setTransform(246,4.85);

	this.instance_2700 = new lib.シンボル1();
	this.instance_2700.setTransform(356,78.55);

	this.instance_2701 = new lib.シンボル1();
	this.instance_2701.setTransform(337.5,65.05);

	this.instance_2702 = new lib.シンボル1();
	this.instance_2702.setTransform(151.5,18.35);

	this.instance_2703 = new lib.シンボル1();
	this.instance_2703.setTransform(133,4.85);

	this.instance_2704 = new lib.シンボル1();
	this.instance_2704.setTransform(411.5,160.25);

	this.instance_2705 = new lib.シンボル1();
	this.instance_2705.setTransform(550,160.25);

	this.instance_2706 = new lib.シンボル1();
	this.instance_2706.setTransform(364,113.55);

	this.instance_2707 = new lib.シンボル1();
	this.instance_2707.setTransform(345.5,100.05);

	this.instance_2708 = new lib.シンボル1();
	this.instance_2708.setTransform(455.5,173.75);

	this.instance_2709 = new lib.シンボル1();
	this.instance_2709.setTransform(437,160.25);

	this.instance_2710 = new lib.シンボル1();
	this.instance_2710.setTransform(251,113.55);

	this.instance_2711 = new lib.シンボル1();
	this.instance_2711.setTransform(232.5,100.05);

	this.instance_2712 = new lib.シンボル1();
	this.instance_2712.setTransform(432,138.75);

	this.instance_2713 = new lib.シンボル1();
	this.instance_2713.setTransform(413.5,125.25);

	this.instance_2714 = new lib.シンボル1();
	this.instance_2714.setTransform(227.5,78.55);

	this.instance_2715 = new lib.シンボル1();
	this.instance_2715.setTransform(209,65.05);

	this.instance_2716 = new lib.シンボル1();
	this.instance_2716.setTransform(319,138.75);

	this.instance_2717 = new lib.シンボル1();
	this.instance_2717.setTransform(300.5,125.25);

	this.instance_2718 = new lib.シンボル1();
	this.instance_2718.setTransform(114.5,78.55);

	this.instance_2719 = new lib.シンボル1();
	this.instance_2719.setTransform(96,65.05);

	this.instance_2720 = new lib.シンボル1();
	this.instance_2720.setTransform(553.5,60.05);

	this.instance_2721 = new lib.シンボル1();
	this.instance_2721.setTransform(535,46.55);

	this.instance_2722 = new lib.シンボル1();
	this.instance_2722.setTransform(506,13.35);

	this.instance_2723 = new lib.シンボル1();
	this.instance_2723.setTransform(487.5,-0.15);

	this.instance_2724 = new lib.シンボル1();
	this.instance_2724.setTransform(440.5,60.05);

	this.instance_2725 = new lib.シンボル1();
	this.instance_2725.setTransform(422,46.55);

	this.instance_2726 = new lib.シンボル1();
	this.instance_2726.setTransform(393,13.35);

	this.instance_2727 = new lib.シンボル1();
	this.instance_2727.setTransform(374.5,-0.15);

	this.instance_2728 = new lib.シンボル1();
	this.instance_2728.setTransform(417,25.05);

	this.instance_2729 = new lib.シンボル1();
	this.instance_2729.setTransform(398.5,11.55);

	this.instance_2730 = new lib.シンボル1();
	this.instance_2730.setTransform(369.5,-21.65);

	this.instance_2731 = new lib.シンボル1();
	this.instance_2731.setTransform(351,-35.15);

	this.instance_2732 = new lib.シンボル1();
	this.instance_2732.setTransform(461,38.55);

	this.instance_2733 = new lib.シンボル1();
	this.instance_2733.setTransform(442.5,25.05);

	this.instance_2734 = new lib.シンボル1();
	this.instance_2734.setTransform(256.5,-21.65);

	this.instance_2735 = new lib.シンボル1();
	this.instance_2735.setTransform(238,-35.15);

	this.instance_2736 = new lib.シンボル1();
	this.instance_2736.setTransform(516.5,120.25);

	this.instance_2737 = new lib.シンボル1();
	this.instance_2737.setTransform(498,106.75);

	this.instance_2738 = new lib.シンボル1();
	this.instance_2738.setTransform(469,73.55);

	this.instance_2739 = new lib.シンボル1();
	this.instance_2739.setTransform(450.5,60.05);

	this.instance_2740 = new lib.シンボル1();
	this.instance_2740.setTransform(403.5,120.25);

	this.instance_2741 = new lib.シンボル1();
	this.instance_2741.setTransform(542,120.25);

	this.instance_2742 = new lib.シンボル1();
	this.instance_2742.setTransform(356,73.55);

	this.instance_2743 = new lib.シンボル1();
	this.instance_2743.setTransform(337.5,60.05);

	this.instance_2744 = new lib.シンボル1();
	this.instance_2744.setTransform(537,98.75);

	this.instance_2745 = new lib.シンボル1();
	this.instance_2745.setTransform(518.5,85.25);

	this.instance_2746 = new lib.シンボル1();
	this.instance_2746.setTransform(332.5,38.55);

	this.instance_2747 = new lib.シンボル1();
	this.instance_2747.setTransform(314,25.05);

	this.instance_2748 = new lib.シンボル1();
	this.instance_2748.setTransform(424,98.75);

	this.instance_2749 = new lib.シンボル1();
	this.instance_2749.setTransform(405.5,85.25);

	this.instance_2750 = new lib.シンボル1();
	this.instance_2750.setTransform(219.5,38.55);

	this.instance_2751 = new lib.シンボル1();
	this.instance_2751.setTransform(201,25.05);

	this.instance_2752 = new lib.シンボル1();
	this.instance_2752.setTransform(510,127.05);

	this.instance_2753 = new lib.シンボル1();
	this.instance_2753.setTransform(491.5,113.55);

	this.instance_2754 = new lib.シンボル1();
	this.instance_2754.setTransform(305.5,66.85);

	this.instance_2755 = new lib.シンボル1();
	this.instance_2755.setTransform(287,53.35);

	this.instance_2756 = new lib.シンボル1();
	this.instance_2756.setTransform(397,127.05);

	this.instance_2757 = new lib.シンボル1();
	this.instance_2757.setTransform(378.5,113.55);

	this.instance_2758 = new lib.シンボル1();
	this.instance_2758.setTransform(192.5,66.85);

	this.instance_2759 = new lib.シンボル1();
	this.instance_2759.setTransform(174,53.35);

	this.instance_2760 = new lib.シンボル1();
	this.instance_2760.setTransform(373.5,92.05);

	this.instance_2761 = new lib.シンボル1();
	this.instance_2761.setTransform(355,78.55);

	this.instance_2762 = new lib.シンボル1();
	this.instance_2762.setTransform(169,31.85);

	this.instance_2763 = new lib.シンボル1();
	this.instance_2763.setTransform(150.5,18.35);

	this.instance_2764 = new lib.シンボル1();
	this.instance_2764.setTransform(260.5,92.05);

	this.instance_2765 = new lib.シンボル1();
	this.instance_2765.setTransform(242,78.55);

	this.instance_2766 = new lib.シンボル1();
	this.instance_2766.setTransform(56,31.85);

	this.instance_2767 = new lib.シンボル1();
	this.instance_2767.setTransform(37.5,18.35);

	this.instance_2768 = new lib.シンボル1();
	this.instance_2768.setTransform(473,187.25);

	this.instance_2769 = new lib.シンボル1();
	this.instance_2769.setTransform(454.5,173.75);

	this.instance_2770 = new lib.シンボル1();
	this.instance_2770.setTransform(268.5,127.05);

	this.instance_2771 = new lib.シンボル1();
	this.instance_2771.setTransform(250,113.55);

	this.instance_2772 = new lib.シンボル1();
	this.instance_2772.setTransform(360,187.25);

	this.instance_2773 = new lib.シンボル1();
	this.instance_2773.setTransform(341.5,173.75);

	this.instance_2774 = new lib.シンボル1();
	this.instance_2774.setTransform(155.5,127.05);

	this.instance_2775 = new lib.シンボル1();
	this.instance_2775.setTransform(137,113.55);

	this.instance_2776 = new lib.シンボル1();
	this.instance_2776.setTransform(336.5,152.25);

	this.instance_2777 = new lib.シンボル1();
	this.instance_2777.setTransform(318,138.75);

	this.instance_2778 = new lib.シンボル1();
	this.instance_2778.setTransform(132,92.05);

	this.instance_2779 = new lib.シンボル1();
	this.instance_2779.setTransform(113.5,78.55);

	this.instance_2780 = new lib.シンボル1();
	this.instance_2780.setTransform(223.5,152.25);

	this.instance_2781 = new lib.シンボル1();
	this.instance_2781.setTransform(205,138.75);

	this.instance_2782 = new lib.シンボル1();
	this.instance_2782.setTransform(45,130.55,1,1,0,0,180);

	this.instance_2783 = new lib.シンボル1();
	this.instance_2783.setTransform(63.5,117.05,1,1,0,0,180);

	this.instance_2784 = new lib.シンボル1();
	this.instance_2784.setTransform(458,73.55);

	this.instance_2785 = new lib.シンボル1();
	this.instance_2785.setTransform(439.5,60.05);

	this.instance_2786 = new lib.シンボル1();
	this.instance_2786.setTransform(410.5,26.85);

	this.instance_2787 = new lib.シンボル1();
	this.instance_2787.setTransform(392,13.35);

	this.instance_2788 = new lib.シンボル1();
	this.instance_2788.setTransform(502,87.05);

	this.instance_2789 = new lib.シンボル1();
	this.instance_2789.setTransform(483.5,73.55);

	this.instance_2790 = new lib.シンボル1();
	this.instance_2790.setTransform(297.5,26.85);

	this.instance_2791 = new lib.シンボル1();
	this.instance_2791.setTransform(279,13.35);

	this.instance_2792 = new lib.シンボル1();
	this.instance_2792.setTransform(478.5,52.05);

	this.instance_2793 = new lib.シンボル1();
	this.instance_2793.setTransform(460,38.55);

	this.instance_2794 = new lib.シンボル1();
	this.instance_2794.setTransform(274,-8.15);

	this.instance_2795 = new lib.シンボル1();
	this.instance_2795.setTransform(255.5,-21.65);

	this.instance_2796 = new lib.シンボル1();
	this.instance_2796.setTransform(365.5,52.05);

	this.instance_2797 = new lib.シンボル1();
	this.instance_2797.setTransform(347,38.55);

	this.instance_2798 = new lib.シンボル1();
	this.instance_2798.setTransform(161,-8.15);

	this.instance_2799 = new lib.シンボル1();
	this.instance_2799.setTransform(142.5,-21.65);

	this.instance_2800 = new lib.シンボル1();
	this.instance_2800.setTransform(421,133.75);

	this.instance_2801 = new lib.シンボル1();
	this.instance_2801.setTransform(402.5,120.25);

	this.instance_2802 = new lib.シンボル1();
	this.instance_2802.setTransform(373.5,87.05);

	this.instance_2803 = new lib.シンボル1();
	this.instance_2803.setTransform(355,73.55);

	this.instance_2804 = new lib.シンボル1();
	this.instance_2804.setTransform(465,147.25);

	this.instance_2805 = new lib.シンボル1();
	this.instance_2805.setTransform(446.5,133.75);

	this.instance_2806 = new lib.シンボル1();
	this.instance_2806.setTransform(260.5,87.05);

	this.instance_2807 = new lib.シンボル1();
	this.instance_2807.setTransform(242,73.55);

	this.instance_2808 = new lib.シンボル1();
	this.instance_2808.setTransform(441.5,112.25);

	this.instance_2809 = new lib.シンボル1();
	this.instance_2809.setTransform(423,98.75);

	this.instance_2810 = new lib.シンボル1();
	this.instance_2810.setTransform(237,52.05);

	this.instance_2811 = new lib.シンボル1();
	this.instance_2811.setTransform(218.5,38.55);

	this.instance_2812 = new lib.シンボル1();
	this.instance_2812.setTransform(328.5,112.25);

	this.instance_2813 = new lib.シンボル1();
	this.instance_2813.setTransform(310,98.75);

	this.instance_2814 = new lib.シンボル1();
	this.instance_2814.setTransform(124,52.05);

	this.instance_2815 = new lib.シンボル1();
	this.instance_2815.setTransform(105.5,38.55);

	this.instance_2816 = new lib.シンボル1();
	this.instance_2816.setTransform(447.5,150.05);

	this.instance_2817 = new lib.シンボル1();
	this.instance_2817.setTransform(429,136.55);

	this.instance_2818 = new lib.シンボル1();
	this.instance_2818.setTransform(243,89.85);

	this.instance_2819 = new lib.シンボル1();
	this.instance_2819.setTransform(224.5,76.35);

	this.instance_2820 = new lib.シンボル1();
	this.instance_2820.setTransform(334.5,150.05);

	this.instance_2821 = new lib.シンボル1();
	this.instance_2821.setTransform(316,136.55);

	this.instance_2822 = new lib.シンボル1();
	this.instance_2822.setTransform(130,89.85);

	this.instance_2823 = new lib.シンボル1();
	this.instance_2823.setTransform(111.5,76.35);

	this.instance_2824 = new lib.シンボル1();
	this.instance_2824.setTransform(311,115.05);

	this.instance_2825 = new lib.シンボル1();
	this.instance_2825.setTransform(292.5,101.55);

	this.instance_2826 = new lib.シンボル1();
	this.instance_2826.setTransform(106.5,54.85);

	this.instance_2827 = new lib.シンボル1();
	this.instance_2827.setTransform(88,41.35);

	this.instance_2828 = new lib.シンボル1();
	this.instance_2828.setTransform(198,115.05);

	this.instance_2829 = new lib.シンボル1();
	this.instance_2829.setTransform(179.5,101.55);

	this.instance_2830 = new lib.シンボル1();
	this.instance_2830.setTransform(70.5,93.35,1,1,0,0,180);

	this.instance_2831 = new lib.シンボル1();
	this.instance_2831.setTransform(89,79.85,1,1,0,0,180);

	this.instance_2832 = new lib.シンボル1();
	this.instance_2832.setTransform(410.5,210.25);

	this.instance_2833 = new lib.シンボル1();
	this.instance_2833.setTransform(392,196.75);

	this.instance_2834 = new lib.シンボル1();
	this.instance_2834.setTransform(206,150.05);

	this.instance_2835 = new lib.シンボル1();
	this.instance_2835.setTransform(187.5,136.55);

	this.instance_2836 = new lib.シンボル1();
	this.instance_2836.setTransform(297.5,210.25);

	this.instance_2837 = new lib.シンボル1();
	this.instance_2837.setTransform(279,196.75);

	this.instance_2838 = new lib.シンボル1();
	this.instance_2838.setTransform(93,150.05);

	this.instance_2839 = new lib.シンボル1();
	this.instance_2839.setTransform(74.5,136.55);

	this.instance_2840 = new lib.シンボル1();
	this.instance_2840.setTransform(274,175.25);

	this.instance_2841 = new lib.シンボル1();
	this.instance_2841.setTransform(255.5,161.75);

	this.instance_2842 = new lib.シンボル1();
	this.instance_2842.setTransform(69.5,115.05);

	this.instance_2843 = new lib.シンボル1();
	this.instance_2843.setTransform(51,101.55);

	this.instance_2844 = new lib.シンボル1();
	this.instance_2844.setTransform(161,175.25);

	this.instance_2845 = new lib.シンボル1();
	this.instance_2845.setTransform(142.5,161.75);

	this.instance_2846 = new lib.シンボル1();
	this.instance_2846.setTransform(107.5,153.55,1,1,0,0,180);

	this.instance_2847 = new lib.シンボル1();
	this.instance_2847.setTransform(126,140.05,1,1,0,0,180);

	this.instance_2848 = new lib.シンボル1();
	this.instance_2848.setTransform(395.5,96.55);

	this.instance_2849 = new lib.シンボル1();
	this.instance_2849.setTransform(534,96.55);

	this.instance_2850 = new lib.シンボル1();
	this.instance_2850.setTransform(348,49.85);

	this.instance_2851 = new lib.シンボル1();
	this.instance_2851.setTransform(329.5,36.35);

	this.instance_2852 = new lib.シンボル1();
	this.instance_2852.setTransform(439.5,110.05);

	this.instance_2853 = new lib.シンボル1();
	this.instance_2853.setTransform(421,96.55);

	this.instance_2854 = new lib.シンボル1();
	this.instance_2854.setTransform(235,49.85);

	this.instance_2855 = new lib.シンボル1();
	this.instance_2855.setTransform(216.5,36.35);

	this.instance_2856 = new lib.シンボル1();
	this.instance_2856.setTransform(416,75.05);

	this.instance_2857 = new lib.シンボル1();
	this.instance_2857.setTransform(397.5,61.55);

	this.instance_2858 = new lib.シンボル1();
	this.instance_2858.setTransform(211.5,14.85);

	this.instance_2859 = new lib.シンボル1();
	this.instance_2859.setTransform(193,1.35);

	this.instance_2860 = new lib.シンボル1();
	this.instance_2860.setTransform(303,75.05);

	this.instance_2861 = new lib.シンボル1();
	this.instance_2861.setTransform(284.5,61.55);

	this.instance_2862 = new lib.シンボル1();
	this.instance_2862.setTransform(98.5,14.85);

	this.instance_2863 = new lib.シンボル1();
	this.instance_2863.setTransform(80,1.35);

	this.instance_2864 = new lib.シンボル1();
	this.instance_2864.setTransform(515.5,170.25);

	this.instance_2865 = new lib.シンボル1();
	this.instance_2865.setTransform(497,156.75);

	this.instance_2866 = new lib.シンボル1();
	this.instance_2866.setTransform(311,110.05);

	this.instance_2867 = new lib.シンボル1();
	this.instance_2867.setTransform(292.5,96.55);

	this.instance_2868 = new lib.シンボル1();
	this.instance_2868.setTransform(402.5,170.25);

	this.instance_2869 = new lib.シンボル1();
	this.instance_2869.setTransform(384,156.75);

	this.instance_2870 = new lib.シンボル1();
	this.instance_2870.setTransform(198,110.05);

	this.instance_2871 = new lib.シンボル1();
	this.instance_2871.setTransform(179.5,96.55);

	this.instance_2872 = new lib.シンボル1();
	this.instance_2872.setTransform(379,135.25);

	this.instance_2873 = new lib.シンボル1();
	this.instance_2873.setTransform(360.5,121.75);

	this.instance_2874 = new lib.シンボル1();
	this.instance_2874.setTransform(174.5,75.05);

	this.instance_2875 = new lib.シンボル1();
	this.instance_2875.setTransform(156,61.55);

	this.instance_2876 = new lib.シンボル1();
	this.instance_2876.setTransform(266,135.25);

	this.instance_2877 = new lib.シンボル1();
	this.instance_2877.setTransform(247.5,121.75);

	this.instance_2878 = new lib.シンボル1();
	this.instance_2878.setTransform(61.5,75.05);

	this.instance_2879 = new lib.シンボル1();
	this.instance_2879.setTransform(43,61.55);

	this.instance_2880 = new lib.シンボル1();
	this.instance_2880.setTransform(352,163.55);

	this.instance_2881 = new lib.シンボル1();
	this.instance_2881.setTransform(333.5,150.05);

	this.instance_2882 = new lib.シンボル1();
	this.instance_2882.setTransform(147.5,103.35);

	this.instance_2883 = new lib.シンボル1();
	this.instance_2883.setTransform(129,89.85);

	this.instance_2884 = new lib.シンボル1();
	this.instance_2884.setTransform(239,163.55);

	this.instance_2885 = new lib.シンボル1();
	this.instance_2885.setTransform(220.5,150.05);

	this.instance_2886 = new lib.シンボル1();
	this.instance_2886.setTransform(34.5,103.35);

	this.instance_2887 = new lib.シンボル1();
	this.instance_2887.setTransform(48,128.35,1,1,0,0,180);

	this.instance_2888 = new lib.シンボル1();
	this.instance_2888.setTransform(215.5,128.55);

	this.instance_2889 = new lib.シンボル1();
	this.instance_2889.setTransform(197,115.05);

	this.instance_2890 = new lib.シンボル1();
	this.instance_2890.setTransform(53,106.85,1,1,0,0,180);

	this.instance_2891 = new lib.シンボル1();
	this.instance_2891.setTransform(71.5,93.35,1,1,0,0,180);

	this.instance_2892 = new lib.シンボル1();
	this.instance_2892.setTransform(102.5,128.55);

	this.instance_2893 = new lib.シンボル1();
	this.instance_2893.setTransform(84,115.05);

	this.instance_2894 = new lib.シンボル1();
	this.instance_2894.setTransform(166,106.85,1,1,0,0,180);

	this.instance_2895 = new lib.シンボル1();
	this.instance_2895.setTransform(184.5,93.35,1,1,0,0,180);

	this.instance_2896 = new lib.シンボル1();
	this.instance_2896.setTransform(315,223.75);

	this.instance_2897 = new lib.シンボル1();
	this.instance_2897.setTransform(296.5,210.25);

	this.instance_2898 = new lib.シンボル1();
	this.instance_2898.setTransform(110.5,163.55);

	this.instance_2899 = new lib.シンボル1();
	this.instance_2899.setTransform(92,150.05);

	this.instance_2900 = new lib.シンボル1();
	this.instance_2900.setTransform(202,223.75);

	this.instance_2901 = new lib.シンボル1();
	this.instance_2901.setTransform(183.5,210.25);

	this.instance_2902 = new lib.シンボル1();
	this.instance_2902.setTransform(66.5,202.05,1,1,0,0,180);

	this.instance_2903 = new lib.シンボル1();
	this.instance_2903.setTransform(85,188.55,1,1,0,0,180);

	this.instance_2904 = new lib.シンボル1();
	this.instance_2904.setTransform(178.5,188.75);

	this.instance_2905 = new lib.シンボル1();
	this.instance_2905.setTransform(160,175.25);

	this.instance_2906 = new lib.シンボル1();
	this.instance_2906.setTransform(90,167.05,1,1,0,0,180);

	this.instance_2907 = new lib.シンボル1();
	this.instance_2907.setTransform(108.5,153.55,1,1,0,0,180);

	this.instance_2908 = new lib.シンボル1();
	this.instance_2908.setTransform(65.5,188.75);

	this.instance_2909 = new lib.シンボル1();
	this.instance_2909.setTransform(47,175.25);

	this.instance_2910 = new lib.シンボル1();
	this.instance_2910.setTransform(203,167.05,1,1,0,0,180);

	this.instance_2911 = new lib.シンボル1();
	this.instance_2911.setTransform(221.5,153.55,1,1,0,0,180);

	this.instance_2912 = new lib.シンボル1();
	this.instance_2912.setTransform(457,123.55);

	this.instance_2913 = new lib.シンボル1();
	this.instance_2913.setTransform(438.5,110.05);

	this.instance_2914 = new lib.シンボル1();
	this.instance_2914.setTransform(252.5,63.35);

	this.instance_2915 = new lib.シンボル1();
	this.instance_2915.setTransform(234,49.85);

	this.instance_2916 = new lib.シンボル1();
	this.instance_2916.setTransform(344,123.55);

	this.instance_2917 = new lib.シンボル1();
	this.instance_2917.setTransform(325.5,110.05);

	this.instance_2918 = new lib.シンボル1();
	this.instance_2918.setTransform(139.5,63.35);

	this.instance_2919 = new lib.シンボル1();
	this.instance_2919.setTransform(121,49.85);

	this.instance_2920 = new lib.シンボル1();
	this.instance_2920.setTransform(320.5,88.55);

	this.instance_2921 = new lib.シンボル1();
	this.instance_2921.setTransform(302,75.05);

	this.instance_2922 = new lib.シンボル1();
	this.instance_2922.setTransform(116,28.35);

	this.instance_2923 = new lib.シンボル1();
	this.instance_2923.setTransform(97.5,14.85);

	this.instance_2924 = new lib.シンボル1();
	this.instance_2924.setTransform(207.5,88.55);

	this.instance_2925 = new lib.シンボル1();
	this.instance_2925.setTransform(189,75.05);

	this.instance_2926 = new lib.シンボル1();
	this.instance_2926.setTransform(61,66.85,1,1,0,0,180);

	this.instance_2927 = new lib.シンボル1();
	this.instance_2927.setTransform(79.5,53.35,1,1,0,0,180);

	this.instance_2928 = new lib.シンボル1();
	this.instance_2928.setTransform(420,183.75);

	this.instance_2929 = new lib.シンボル1();
	this.instance_2929.setTransform(401.5,170.25);

	this.instance_2930 = new lib.シンボル1();
	this.instance_2930.setTransform(215.5,123.55);

	this.instance_2931 = new lib.シンボル1();
	this.instance_2931.setTransform(197,110.05);

	this.instance_2932 = new lib.シンボル1();
	this.instance_2932.setTransform(307,183.75);

	this.instance_2933 = new lib.シンボル1();
	this.instance_2933.setTransform(288.5,170.25);

	this.instance_2934 = new lib.シンボル1();
	this.instance_2934.setTransform(102.5,123.55);

	this.instance_2935 = new lib.シンボル1();
	this.instance_2935.setTransform(84,110.05);

	this.instance_2936 = new lib.シンボル1();
	this.instance_2936.setTransform(283.5,148.75);

	this.instance_2937 = new lib.シンボル1();
	this.instance_2937.setTransform(265,135.25);

	this.instance_2938 = new lib.シンボル1();
	this.instance_2938.setTransform(79,88.55);

	this.instance_2939 = new lib.シンボル1();
	this.instance_2939.setTransform(60.5,75.05);

	this.instance_2940 = new lib.シンボル1();
	this.instance_2940.setTransform(170.5,148.75);

	this.instance_2941 = new lib.シンボル1();
	this.instance_2941.setTransform(152,135.25);

	this.instance_2942 = new lib.シンボル1();
	this.instance_2942.setTransform(98,127.05,1,1,0,0,180);

	this.instance_2943 = new lib.シンボル1();
	this.instance_2943.setTransform(116.5,113.55,1,1,0,0,180);

	this.instance_2944 = new lib.シンボル1();
	this.instance_2944.setTransform(535.5,127.05);

	this.instance_2945 = new lib.シンボル1();
	this.instance_2945.setTransform(517,113.55);

	this.instance_2946 = new lib.シンボル1();
	this.instance_2946.setTransform(331,66.85);

	this.instance_2947 = new lib.シンボル1();
	this.instance_2947.setTransform(312.5,53.35);

	this.instance_2948 = new lib.シンボル1();
	this.instance_2948.setTransform(422.5,127.05);

	this.instance_2949 = new lib.シンボル1();
	this.instance_2949.setTransform(404,113.55);

	this.instance_2950 = new lib.シンボル1();
	this.instance_2950.setTransform(218,66.85);

	this.instance_2951 = new lib.シンボル1();
	this.instance_2951.setTransform(199.5,53.35);

	this.instance_2952 = new lib.シンボル1();
	this.instance_2952.setTransform(399,92.05);

	this.instance_2953 = new lib.シンボル1();
	this.instance_2953.setTransform(380.5,78.55);

	this.instance_2954 = new lib.シンボル1();
	this.instance_2954.setTransform(194.5,31.85);

	this.instance_2955 = new lib.シンボル1();
	this.instance_2955.setTransform(176,18.35);

	this.instance_2956 = new lib.シンボル1();
	this.instance_2956.setTransform(286,92.05);

	this.instance_2957 = new lib.シンボル1();
	this.instance_2957.setTransform(267.5,78.55);

	this.instance_2958 = new lib.シンボル1();
	this.instance_2958.setTransform(81.5,31.85);

	this.instance_2959 = new lib.シンボル1();
	this.instance_2959.setTransform(63,18.35);

	this.instance_2960 = new lib.シンボル1();
	this.instance_2960.setTransform(498.5,187.25);

	this.instance_2961 = new lib.シンボル1();
	this.instance_2961.setTransform(480,173.75);

	this.instance_2962 = new lib.シンボル1();
	this.instance_2962.setTransform(294,127.05);

	this.instance_2963 = new lib.シンボル1();
	this.instance_2963.setTransform(275.5,113.55);

	this.instance_2964 = new lib.シンボル1();
	this.instance_2964.setTransform(385.5,187.25);

	this.instance_2965 = new lib.シンボル1();
	this.instance_2965.setTransform(367,173.75);

	this.instance_2966 = new lib.シンボル1();
	this.instance_2966.setTransform(181,127.05);

	this.instance_2967 = new lib.シンボル1();
	this.instance_2967.setTransform(162.5,113.55);

	this.instance_2968 = new lib.シンボル1();
	this.instance_2968.setTransform(362,152.25);

	this.instance_2969 = new lib.シンボル1();
	this.instance_2969.setTransform(343.5,138.75);

	this.instance_2970 = new lib.シンボル1();
	this.instance_2970.setTransform(157.5,92.05);

	this.instance_2971 = new lib.シンボル1();
	this.instance_2971.setTransform(139,78.55);

	this.instance_2972 = new lib.シンボル1();
	this.instance_2972.setTransform(249,152.25);

	this.instance_2973 = new lib.シンボル1();
	this.instance_2973.setTransform(230.5,138.75);

	this.instance_2974 = new lib.シンボル1();
	this.instance_2974.setTransform(44.5,92.05);

	this.instance_2975 = new lib.シンボル1();
	this.instance_2975.setTransform(38,117.05,1,1,0,0,180);

	this.instance_2976 = new lib.シンボル1();
	this.instance_2976.setTransform(483.5,73.55);

	this.instance_2977 = new lib.シンボル1();
	this.instance_2977.setTransform(465,60.05);

	this.instance_2978 = new lib.シンボル1();
	this.instance_2978.setTransform(436,26.85);

	this.instance_2979 = new lib.シンボル1();
	this.instance_2979.setTransform(417.5,13.35);

	this.instance_2980 = new lib.シンボル1();
	this.instance_2980.setTransform(527.5,87.05);

	this.instance_2981 = new lib.シンボル1();
	this.instance_2981.setTransform(509,73.55);

	this.instance_2982 = new lib.シンボル1();
	this.instance_2982.setTransform(323,26.85);

	this.instance_2983 = new lib.シンボル1();
	this.instance_2983.setTransform(304.5,13.35);

	this.instance_2984 = new lib.シンボル1();
	this.instance_2984.setTransform(504,52.05);

	this.instance_2985 = new lib.シンボル1();
	this.instance_2985.setTransform(485.5,38.55);

	this.instance_2986 = new lib.シンボル1();
	this.instance_2986.setTransform(299.5,-8.15);

	this.instance_2987 = new lib.シンボル1();
	this.instance_2987.setTransform(281,-21.65);

	this.instance_2988 = new lib.シンボル1();
	this.instance_2988.setTransform(391,52.05);

	this.instance_2989 = new lib.シンボル1();
	this.instance_2989.setTransform(372.5,38.55);

	this.instance_2990 = new lib.シンボル1();
	this.instance_2990.setTransform(186.5,-8.15);

	this.instance_2991 = new lib.シンボル1();
	this.instance_2991.setTransform(168,-21.65);

	this.instance_2992 = new lib.シンボル1();
	this.instance_2992.setTransform(446.5,133.75);

	this.instance_2993 = new lib.シンボル1();
	this.instance_2993.setTransform(428,120.25);

	this.instance_2994 = new lib.シンボル1();
	this.instance_2994.setTransform(399,87.05);

	this.instance_2995 = new lib.シンボル1();
	this.instance_2995.setTransform(380.5,73.55);

	this.instance_2996 = new lib.シンボル1();
	this.instance_2996.setTransform(490.5,147.25);

	this.instance_2997 = new lib.シンボル1();
	this.instance_2997.setTransform(472,133.75);

	this.instance_2998 = new lib.シンボル1();
	this.instance_2998.setTransform(286,87.05);

	this.instance_2999 = new lib.シンボル1();
	this.instance_2999.setTransform(267.5,73.55);

	this.instance_3000 = new lib.シンボル1();
	this.instance_3000.setTransform(467,112.25);

	this.instance_3001 = new lib.シンボル1();
	this.instance_3001.setTransform(448.5,98.75);

	this.instance_3002 = new lib.シンボル1();
	this.instance_3002.setTransform(262.5,52.05);

	this.instance_3003 = new lib.シンボル1();
	this.instance_3003.setTransform(244,38.55);

	this.instance_3004 = new lib.シンボル1();
	this.instance_3004.setTransform(354,112.25);

	this.instance_3005 = new lib.シンボル1();
	this.instance_3005.setTransform(335.5,98.75);

	this.instance_3006 = new lib.シンボル1();
	this.instance_3006.setTransform(149.5,52.05);

	this.instance_3007 = new lib.シンボル1();
	this.instance_3007.setTransform(131,38.55);

	this.instance_3008 = new lib.シンボル1();
	this.instance_3008.setTransform(440,140.55);

	this.instance_3009 = new lib.シンボル1();
	this.instance_3009.setTransform(421.5,127.05);

	this.instance_3010 = new lib.シンボル1();
	this.instance_3010.setTransform(235.5,80.35);

	this.instance_3011 = new lib.シンボル1();
	this.instance_3011.setTransform(217,66.85);

	this.instance_3012 = new lib.シンボル1();
	this.instance_3012.setTransform(327,140.55);

	this.instance_3013 = new lib.シンボル1();
	this.instance_3013.setTransform(308.5,127.05);

	this.instance_3014 = new lib.シンボル1();
	this.instance_3014.setTransform(122.5,80.35);

	this.instance_3015 = new lib.シンボル1();
	this.instance_3015.setTransform(104,66.85);

	this.instance_3016 = new lib.シンボル1();
	this.instance_3016.setTransform(303.5,105.55);

	this.instance_3017 = new lib.シンボル1();
	this.instance_3017.setTransform(285,92.05);

	this.instance_3018 = new lib.シンボル1();
	this.instance_3018.setTransform(99,45.35);

	this.instance_3019 = new lib.シンボル1();
	this.instance_3019.setTransform(80.5,31.85);

	this.instance_3020 = new lib.シンボル1();
	this.instance_3020.setTransform(190.5,105.55);

	this.instance_3021 = new lib.シンボル1();
	this.instance_3021.setTransform(172,92.05);

	this.instance_3022 = new lib.シンボル1();
	this.instance_3022.setTransform(78,83.85,1,1,0,0,180);

	this.instance_3023 = new lib.シンボル1();
	this.instance_3023.setTransform(96.5,70.35,1,1,0,0,180);

	this.instance_3024 = new lib.シンボル1();
	this.instance_3024.setTransform(403,200.75);

	this.instance_3025 = new lib.シンボル1();
	this.instance_3025.setTransform(384.5,187.25);

	this.instance_3026 = new lib.シンボル1();
	this.instance_3026.setTransform(198.5,140.55);

	this.instance_3027 = new lib.シンボル1();
	this.instance_3027.setTransform(180,127.05);

	this.instance_3028 = new lib.シンボル1();
	this.instance_3028.setTransform(290,200.75);

	this.instance_3029 = new lib.シンボル1();
	this.instance_3029.setTransform(271.5,187.25);

	this.instance_3030 = new lib.シンボル1();
	this.instance_3030.setTransform(85.5,140.55);

	this.instance_3031 = new lib.シンボル1();
	this.instance_3031.setTransform(67,127.05);

	this.instance_3032 = new lib.シンボル1();
	this.instance_3032.setTransform(266.5,165.75);

	this.instance_3033 = new lib.シンボル1();
	this.instance_3033.setTransform(248,152.25);

	this.instance_3034 = new lib.シンボル1();
	this.instance_3034.setTransform(62,105.55);

	this.instance_3035 = new lib.シンボル1();
	this.instance_3035.setTransform(43.5,92.05);

	this.instance_3036 = new lib.シンボル1();
	this.instance_3036.setTransform(153.5,165.75);

	this.instance_3037 = new lib.シンボル1();
	this.instance_3037.setTransform(135,152.25);

	this.instance_3038 = new lib.シンボル1();
	this.instance_3038.setTransform(115,144.05,1,1,0,0,180);

	this.instance_3039 = new lib.シンボル1();
	this.instance_3039.setTransform(133.5,130.55,1,1,0,0,180);

	this.instance_3040 = new lib.シンボル1();
	this.instance_3040.setTransform(545,100.55);

	this.instance_3041 = new lib.シンボル1();
	this.instance_3041.setTransform(526.5,87.05);

	this.instance_3042 = new lib.シンボル1();
	this.instance_3042.setTransform(340.5,40.35);

	this.instance_3043 = new lib.シンボル1();
	this.instance_3043.setTransform(322,26.85);

	this.instance_3044 = new lib.シンボル1();
	this.instance_3044.setTransform(432,100.55);

	this.instance_3045 = new lib.シンボル1();
	this.instance_3045.setTransform(413.5,87.05);

	this.instance_3046 = new lib.シンボル1();
	this.instance_3046.setTransform(227.5,40.35);

	this.instance_3047 = new lib.シンボル1();
	this.instance_3047.setTransform(209,26.85);

	this.instance_3048 = new lib.シンボル1();
	this.instance_3048.setTransform(408.5,65.55);

	this.instance_3049 = new lib.シンボル1();
	this.instance_3049.setTransform(390,52.05);

	this.instance_3050 = new lib.シンボル1();
	this.instance_3050.setTransform(204,5.35);

	this.instance_3051 = new lib.シンボル1();
	this.instance_3051.setTransform(185.5,-8.15);

	this.instance_3052 = new lib.シンボル1();
	this.instance_3052.setTransform(295.5,65.55);

	this.instance_3053 = new lib.シンボル1();
	this.instance_3053.setTransform(277,52.05);

	this.instance_3054 = new lib.シンボル1();
	this.instance_3054.setTransform(91,5.35);

	this.instance_3055 = new lib.シンボル1();
	this.instance_3055.setTransform(72.5,-8.15);

	this.instance_3056 = new lib.シンボル1();
	this.instance_3056.setTransform(508,160.75);

	this.instance_3057 = new lib.シンボル1();
	this.instance_3057.setTransform(489.5,147.25);

	this.instance_3058 = new lib.シンボル1();
	this.instance_3058.setTransform(303.5,100.55);

	this.instance_3059 = new lib.シンボル1();
	this.instance_3059.setTransform(285,87.05);

	this.instance_3060 = new lib.シンボル1();
	this.instance_3060.setTransform(395,160.75);

	this.instance_3061 = new lib.シンボル1();
	this.instance_3061.setTransform(376.5,147.25);

	this.instance_3062 = new lib.シンボル1();
	this.instance_3062.setTransform(190.5,100.55);

	this.instance_3063 = new lib.シンボル1();
	this.instance_3063.setTransform(172,87.05);

	this.instance_3064 = new lib.シンボル1();
	this.instance_3064.setTransform(371.5,125.75);

	this.instance_3065 = new lib.シンボル1();
	this.instance_3065.setTransform(353,112.25);

	this.instance_3066 = new lib.シンボル1();
	this.instance_3066.setTransform(167,65.55);

	this.instance_3067 = new lib.シンボル1();
	this.instance_3067.setTransform(148.5,52.05);

	this.instance_3068 = new lib.シンボル1();
	this.instance_3068.setTransform(258.5,125.75);

	this.instance_3069 = new lib.シンボル1();
	this.instance_3069.setTransform(240,112.25);

	this.instance_3070 = new lib.シンボル1();
	this.instance_3070.setTransform(54,65.55);

	this.instance_3071 = new lib.シンボル1();
	this.instance_3071.setTransform(35.5,52.05);

	this.instance_3072 = new lib.シンボル1();
	this.instance_3072.setTransform(519,119.55);

	this.instance_3073 = new lib.シンボル1();
	this.instance_3073.setTransform(500.5,106.05);

	this.instance_3074 = new lib.シンボル1();
	this.instance_3074.setTransform(314.5,59.35);

	this.instance_3075 = new lib.シンボル1();
	this.instance_3075.setTransform(296,45.85);

	this.instance_3076 = new lib.シンボル1();
	this.instance_3076.setTransform(406,119.55);

	this.instance_3077 = new lib.シンボル1();
	this.instance_3077.setTransform(387.5,106.05);

	this.instance_3078 = new lib.シンボル1();
	this.instance_3078.setTransform(201.5,59.35);

	this.instance_3079 = new lib.シンボル1();
	this.instance_3079.setTransform(183,45.85);

	this.instance_3080 = new lib.シンボル1();
	this.instance_3080.setTransform(382.5,84.55);

	this.instance_3081 = new lib.シンボル1();
	this.instance_3081.setTransform(364,71.05);

	this.instance_3082 = new lib.シンボル1();
	this.instance_3082.setTransform(178,24.35);

	this.instance_3083 = new lib.シンボル1();
	this.instance_3083.setTransform(159.5,10.85);

	this.instance_3084 = new lib.シンボル1();
	this.instance_3084.setTransform(269.5,84.55);

	this.instance_3085 = new lib.シンボル1();
	this.instance_3085.setTransform(251,71.05);

	this.instance_3086 = new lib.シンボル1();
	this.instance_3086.setTransform(65,24.35);

	this.instance_3087 = new lib.シンボル1();
	this.instance_3087.setTransform(46.5,10.85);

	this.instance_3088 = new lib.シンボル1();
	this.instance_3088.setTransform(482,179.75);

	this.instance_3089 = new lib.シンボル1();
	this.instance_3089.setTransform(463.5,166.25);

	this.instance_3090 = new lib.シンボル1();
	this.instance_3090.setTransform(277.5,119.55);

	this.instance_3091 = new lib.シンボル1();
	this.instance_3091.setTransform(259,106.05);

	this.instance_3092 = new lib.シンボル1();
	this.instance_3092.setTransform(369,179.75);

	this.instance_3093 = new lib.シンボル1();
	this.instance_3093.setTransform(350.5,166.25);

	this.instance_3094 = new lib.シンボル1();
	this.instance_3094.setTransform(164.5,119.55);

	this.instance_3095 = new lib.シンボル1();
	this.instance_3095.setTransform(146,106.05);

	this.instance_3096 = new lib.シンボル1();
	this.instance_3096.setTransform(345.5,144.75);

	this.instance_3097 = new lib.シンボル1();
	this.instance_3097.setTransform(327,131.25);

	this.instance_3098 = new lib.シンボル1();
	this.instance_3098.setTransform(141,84.55);

	this.instance_3099 = new lib.シンボル1();
	this.instance_3099.setTransform(122.5,71.05);

	this.instance_3100 = new lib.シンボル1();
	this.instance_3100.setTransform(232.5,144.75);

	this.instance_3101 = new lib.シンボル1();
	this.instance_3101.setTransform(214,131.25);

	this.instance_3102 = new lib.シンボル1();
	this.instance_3102.setTransform(39,123.05,1,1,0,0,180);

	this.instance_3103 = new lib.シンボル1();
	this.instance_3103.setTransform(57.5,109.55,1,1,0,0,180);

	this.instance_3104 = new lib.シンボル1();
	this.instance_3104.setTransform(467,66.05);

	this.instance_3105 = new lib.シンボル1();
	this.instance_3105.setTransform(448.5,52.55);

	this.instance_3106 = new lib.シンボル1();
	this.instance_3106.setTransform(419.5,19.35);

	this.instance_3107 = new lib.シンボル1();
	this.instance_3107.setTransform(401,5.85);

	this.instance_3108 = new lib.シンボル1();
	this.instance_3108.setTransform(511,79.55);

	this.instance_3109 = new lib.シンボル1();
	this.instance_3109.setTransform(492.5,66.05);

	this.instance_3110 = new lib.シンボル1();
	this.instance_3110.setTransform(306.5,19.35);

	this.instance_3111 = new lib.シンボル1();
	this.instance_3111.setTransform(288,5.85);

	this.instance_3112 = new lib.シンボル1();
	this.instance_3112.setTransform(487.5,44.55);

	this.instance_3113 = new lib.シンボル1();
	this.instance_3113.setTransform(469,31.05);

	this.instance_3114 = new lib.シンボル1();
	this.instance_3114.setTransform(283,-15.65);

	this.instance_3115 = new lib.シンボル1();
	this.instance_3115.setTransform(264.5,-29.15);

	this.instance_3116 = new lib.シンボル1();
	this.instance_3116.setTransform(374.5,44.55);

	this.instance_3117 = new lib.シンボル1();
	this.instance_3117.setTransform(356,31.05);

	this.instance_3118 = new lib.シンボル1();
	this.instance_3118.setTransform(170,-15.65);

	this.instance_3119 = new lib.シンボル1();
	this.instance_3119.setTransform(151.5,-29.15);

	this.instance_3120 = new lib.シンボル1();
	this.instance_3120.setTransform(430,126.25);

	this.instance_3121 = new lib.シンボル1();
	this.instance_3121.setTransform(411.5,112.75);

	this.instance_3122 = new lib.シンボル1();
	this.instance_3122.setTransform(382.5,79.55);

	this.instance_3123 = new lib.シンボル1();
	this.instance_3123.setTransform(364,66.05);

	this.instance_3124 = new lib.シンボル1();
	this.instance_3124.setTransform(474,139.75);

	this.instance_3125 = new lib.シンボル1();
	this.instance_3125.setTransform(455.5,126.25);

	this.instance_3126 = new lib.シンボル1();
	this.instance_3126.setTransform(269.5,79.55);

	this.instance_3127 = new lib.シンボル1();
	this.instance_3127.setTransform(251,66.05);

	this.instance_3128 = new lib.シンボル1();
	this.instance_3128.setTransform(450.5,104.75);

	this.instance_3129 = new lib.シンボル1();
	this.instance_3129.setTransform(432,91.25);

	this.instance_3130 = new lib.シンボル1();
	this.instance_3130.setTransform(246,44.55);

	this.instance_3131 = new lib.シンボル1();
	this.instance_3131.setTransform(227.5,31.05);

	this.instance_3132 = new lib.シンボル1();
	this.instance_3132.setTransform(337.5,104.75);

	this.instance_3133 = new lib.シンボル1();
	this.instance_3133.setTransform(319,91.25);

	this.instance_3134 = new lib.シンボル1();
	this.instance_3134.setTransform(133,44.55);

	this.instance_3135 = new lib.シンボル1();
	this.instance_3135.setTransform(114.5,31.05);

	this.instance_3136 = new lib.シンボル1();
	this.instance_3136.setTransform(423.5,133.05);

	this.instance_3137 = new lib.シンボル1();
	this.instance_3137.setTransform(405,119.55);

	this.instance_3138 = new lib.シンボル1();
	this.instance_3138.setTransform(219,72.85);

	this.instance_3139 = new lib.シンボル1();
	this.instance_3139.setTransform(200.5,59.35);

	this.instance_3140 = new lib.シンボル1();
	this.instance_3140.setTransform(310.5,133.05);

	this.instance_3141 = new lib.シンボル1();
	this.instance_3141.setTransform(292,119.55);

	this.instance_3142 = new lib.シンボル1();
	this.instance_3142.setTransform(106,72.85);

	this.instance_3143 = new lib.シンボル1();
	this.instance_3143.setTransform(87.5,59.35);

	this.instance_3144 = new lib.シンボル1();
	this.instance_3144.setTransform(287,98.05);

	this.instance_3145 = new lib.シンボル1();
	this.instance_3145.setTransform(268.5,84.55);

	this.instance_3146 = new lib.シンボル1();
	this.instance_3146.setTransform(82.5,37.85);

	this.instance_3147 = new lib.シンボル1();
	this.instance_3147.setTransform(64,24.35);

	this.instance_3148 = new lib.シンボル1();
	this.instance_3148.setTransform(174,98.05);

	this.instance_3149 = new lib.シンボル1();
	this.instance_3149.setTransform(155.5,84.55);

	this.instance_3150 = new lib.シンボル1();
	this.instance_3150.setTransform(97.5,76.35,1,1,0,0,180);

	this.instance_3151 = new lib.シンボル1();
	this.instance_3151.setTransform(116,62.85,1,1,0,0,180);

	this.instance_3152 = new lib.シンボル1();
	this.instance_3152.setTransform(386.5,193.25);

	this.instance_3153 = new lib.シンボル1();
	this.instance_3153.setTransform(368,179.75);

	this.instance_3154 = new lib.シンボル1();
	this.instance_3154.setTransform(182,133.05);

	this.instance_3155 = new lib.シンボル1();
	this.instance_3155.setTransform(163.5,119.55);

	this.instance_3156 = new lib.シンボル1();
	this.instance_3156.setTransform(273.5,193.25);

	this.instance_3157 = new lib.シンボル1();
	this.instance_3157.setTransform(255,179.75);

	this.instance_3158 = new lib.シンボル1();
	this.instance_3158.setTransform(69,133.05);

	this.instance_3159 = new lib.シンボル1();
	this.instance_3159.setTransform(50.5,119.55);

	this.instance_3160 = new lib.シンボル1();
	this.instance_3160.setTransform(250,158.25);

	this.instance_3161 = new lib.シンボル1();
	this.instance_3161.setTransform(231.5,144.75);

	this.instance_3162 = new lib.シンボル1();
	this.instance_3162.setTransform(45.5,98.05);

	this.instance_3163 = new lib.シンボル1();
	this.instance_3163.setTransform(40,123.05,1,1,0,0,180);

	this.instance_3164 = new lib.シンボル1();
	this.instance_3164.setTransform(137,158.25);

	this.instance_3165 = new lib.シンボル1();
	this.instance_3165.setTransform(118.5,144.75);

	this.instance_3166 = new lib.シンボル1();
	this.instance_3166.setTransform(134.5,136.55,1,1,0,0,180);

	this.instance_3167 = new lib.シンボル1();
	this.instance_3167.setTransform(153,123.05,1,1,0,0,180);

	this.instance_3168 = new lib.シンボル1();
	this.instance_3168.setTransform(528.5,93.05);

	this.instance_3169 = new lib.シンボル1();
	this.instance_3169.setTransform(510,79.55);

	this.instance_3170 = new lib.シンボル1();
	this.instance_3170.setTransform(324,32.85);

	this.instance_3171 = new lib.シンボル1();
	this.instance_3171.setTransform(305.5,19.35);

	this.instance_3172 = new lib.シンボル1();
	this.instance_3172.setTransform(415.5,93.05);

	this.instance_3173 = new lib.シンボル1();
	this.instance_3173.setTransform(397,79.55);

	this.instance_3174 = new lib.シンボル1();
	this.instance_3174.setTransform(211,32.85);

	this.instance_3175 = new lib.シンボル1();
	this.instance_3175.setTransform(192.5,19.35);

	this.instance_3176 = new lib.シンボル1();
	this.instance_3176.setTransform(392,58.05);

	this.instance_3177 = new lib.シンボル1();
	this.instance_3177.setTransform(373.5,44.55);

	this.instance_3178 = new lib.シンボル1();
	this.instance_3178.setTransform(187.5,-2.15);

	this.instance_3179 = new lib.シンボル1();
	this.instance_3179.setTransform(169,-15.65);

	this.instance_3180 = new lib.シンボル1();
	this.instance_3180.setTransform(279,58.05);

	this.instance_3181 = new lib.シンボル1();
	this.instance_3181.setTransform(260.5,44.55);

	this.instance_3182 = new lib.シンボル1();
	this.instance_3182.setTransform(74.5,-2.15);

	this.instance_3183 = new lib.シンボル1();
	this.instance_3183.setTransform(56,-15.65);

	this.instance_3184 = new lib.シンボル1();
	this.instance_3184.setTransform(491.5,153.25);

	this.instance_3185 = new lib.シンボル1();
	this.instance_3185.setTransform(473,139.75);

	this.instance_3186 = new lib.シンボル1();
	this.instance_3186.setTransform(287,93.05);

	this.instance_3187 = new lib.シンボル1();
	this.instance_3187.setTransform(268.5,79.55);

	this.instance_3188 = new lib.シンボル1();
	this.instance_3188.setTransform(378.5,153.25);

	this.instance_3189 = new lib.シンボル1();
	this.instance_3189.setTransform(360,139.75);

	this.instance_3190 = new lib.シンボル1();
	this.instance_3190.setTransform(174,93.05);

	this.instance_3191 = new lib.シンボル1();
	this.instance_3191.setTransform(155.5,79.55);

	this.instance_3192 = new lib.シンボル1();
	this.instance_3192.setTransform(355,118.25);

	this.instance_3193 = new lib.シンボル1();
	this.instance_3193.setTransform(336.5,104.75);

	this.instance_3194 = new lib.シンボル1();
	this.instance_3194.setTransform(150.5,58.05);

	this.instance_3195 = new lib.シンボル1();
	this.instance_3195.setTransform(132,44.55);

	this.instance_3196 = new lib.シンボル1();
	this.instance_3196.setTransform(242,118.25);

	this.instance_3197 = new lib.シンボル1();
	this.instance_3197.setTransform(223.5,104.75);

	this.instance_3198 = new lib.シンボル1();
	this.instance_3198.setTransform(37.5,58.05);

	this.instance_3199 = new lib.シンボル1();
	this.instance_3199.setTransform(48,83.05,1,1,0,0,180);

	this.instance_3200 = new lib.シンボル1();
	this.instance_3200.setTransform(450,83.05);

	this.instance_3201 = new lib.シンボル1();
	this.instance_3201.setTransform(431.5,69.55);

	this.instance_3202 = new lib.シンボル1();
	this.instance_3202.setTransform(402.5,36.35);

	this.instance_3203 = new lib.シンボル1();
	this.instance_3203.setTransform(384,22.85);

	this.instance_3204 = new lib.シンボル1();
	this.instance_3204.setTransform(494,96.55);

	this.instance_3205 = new lib.シンボル1();
	this.instance_3205.setTransform(475.5,83.05);

	this.instance_3206 = new lib.シンボル1();
	this.instance_3206.setTransform(289.5,36.35);

	this.instance_3207 = new lib.シンボル1();
	this.instance_3207.setTransform(271,22.85);

	this.instance_3208 = new lib.シンボル1();
	this.instance_3208.setTransform(470.5,61.55);

	this.instance_3209 = new lib.シンボル1();
	this.instance_3209.setTransform(452,48.05);

	this.instance_3210 = new lib.シンボル1();
	this.instance_3210.setTransform(266,1.35);

	this.instance_3211 = new lib.シンボル1();
	this.instance_3211.setTransform(247.5,-12.15);

	this.instance_3212 = new lib.シンボル1();
	this.instance_3212.setTransform(357.5,61.55);

	this.instance_3213 = new lib.シンボル1();
	this.instance_3213.setTransform(339,48.05);

	this.instance_3214 = new lib.シンボル1();
	this.instance_3214.setTransform(153,1.35);

	this.instance_3215 = new lib.シンボル1();
	this.instance_3215.setTransform(134.5,-12.15);

	this.instance_3216 = new lib.シンボル1();
	this.instance_3216.setTransform(413,143.25);

	this.instance_3217 = new lib.シンボル1();
	this.instance_3217.setTransform(551.5,143.25);

	this.instance_3218 = new lib.シンボル1();
	this.instance_3218.setTransform(365.5,96.55);

	this.instance_3219 = new lib.シンボル1();
	this.instance_3219.setTransform(347,83.05);

	this.instance_3220 = new lib.シンボル1();
	this.instance_3220.setTransform(457,156.75);

	this.instance_3221 = new lib.シンボル1();
	this.instance_3221.setTransform(438.5,143.25);

	this.instance_3222 = new lib.シンボル1();
	this.instance_3222.setTransform(252.5,96.55);

	this.instance_3223 = new lib.シンボル1();
	this.instance_3223.setTransform(234,83.05);

	this.instance_3224 = new lib.シンボル1();
	this.instance_3224.setTransform(433.5,121.75);

	this.instance_3225 = new lib.シンボル1();
	this.instance_3225.setTransform(415,108.25);

	this.instance_3226 = new lib.シンボル1();
	this.instance_3226.setTransform(229,61.55);

	this.instance_3227 = new lib.シンボル1();
	this.instance_3227.setTransform(210.5,48.05);

	this.instance_3228 = new lib.シンボル1();
	this.instance_3228.setTransform(320.5,121.75);

	this.instance_3229 = new lib.シンボル1();
	this.instance_3229.setTransform(302,108.25);

	this.instance_3230 = new lib.シンボル1();
	this.instance_3230.setTransform(116,61.55);

	this.instance_3231 = new lib.シンボル1();
	this.instance_3231.setTransform(97.5,48.05);

	this.instance_3232 = new lib.シンボル1();
	this.instance_3232.setTransform(555,43.05);

	this.instance_3233 = new lib.シンボル1();
	this.instance_3233.setTransform(536.5,29.55);

	this.instance_3234 = new lib.シンボル1();
	this.instance_3234.setTransform(507.5,-3.65);

	this.instance_3235 = new lib.シンボル1();
	this.instance_3235.setTransform(489,-17.15);

	this.instance_3236 = new lib.シンボル1();
	this.instance_3236.setTransform(442,43.05);

	this.instance_3237 = new lib.シンボル1();
	this.instance_3237.setTransform(423.5,29.55);

	this.instance_3238 = new lib.シンボル1();
	this.instance_3238.setTransform(394.5,-3.65);

	this.instance_3239 = new lib.シンボル1();
	this.instance_3239.setTransform(376,-17.15);

	this.instance_3240 = new lib.シンボル1();
	this.instance_3240.setTransform(418.5,8.05);

	this.instance_3241 = new lib.シンボル1();
	this.instance_3241.setTransform(400,-5.45);

	this.instance_3242 = new lib.シンボル1();
	this.instance_3242.setTransform(371,-38.65);

	this.instance_3243 = new lib.シンボル1();
	this.instance_3243.setTransform(352.5,-52.15);

	this.instance_3244 = new lib.シンボル1();
	this.instance_3244.setTransform(462.5,21.55);

	this.instance_3245 = new lib.シンボル1();
	this.instance_3245.setTransform(444,8.05);

	this.instance_3246 = new lib.シンボル1();
	this.instance_3246.setTransform(258,-38.65);

	this.instance_3247 = new lib.シンボル1();
	this.instance_3247.setTransform(239.5,-52.15);

	this.instance_3248 = new lib.シンボル1();
	this.instance_3248.setTransform(518,103.25);

	this.instance_3249 = new lib.シンボル1();
	this.instance_3249.setTransform(499.5,89.75);

	this.instance_3250 = new lib.シンボル1();
	this.instance_3250.setTransform(470.5,56.55);

	this.instance_3251 = new lib.シンボル1();
	this.instance_3251.setTransform(452,43.05);

	this.instance_3252 = new lib.シンボル1();
	this.instance_3252.setTransform(405,103.25);

	this.instance_3253 = new lib.シンボル1();
	this.instance_3253.setTransform(543.5,103.25);

	this.instance_3254 = new lib.シンボル1();
	this.instance_3254.setTransform(357.5,56.55);

	this.instance_3255 = new lib.シンボル1();
	this.instance_3255.setTransform(339,43.05);

	this.instance_3256 = new lib.シンボル1();
	this.instance_3256.setTransform(538.5,81.75);

	this.instance_3257 = new lib.シンボル1();
	this.instance_3257.setTransform(520,68.25);

	this.instance_3258 = new lib.シンボル1();
	this.instance_3258.setTransform(334,21.55);

	this.instance_3259 = new lib.シンボル1();
	this.instance_3259.setTransform(315.5,8.05);

	this.instance_3260 = new lib.シンボル1();
	this.instance_3260.setTransform(425.5,81.75);

	this.instance_3261 = new lib.シンボル1();
	this.instance_3261.setTransform(407,68.25);

	this.instance_3262 = new lib.シンボル1();
	this.instance_3262.setTransform(221,21.55);

	this.instance_3263 = new lib.シンボル1();
	this.instance_3263.setTransform(202.5,8.05);

	this.instance_3264 = new lib.シンボル1();
	this.instance_3264.setTransform(511.5,110.05);

	this.instance_3265 = new lib.シンボル1();
	this.instance_3265.setTransform(493,96.55);

	this.instance_3266 = new lib.シンボル1();
	this.instance_3266.setTransform(307,49.85);

	this.instance_3267 = new lib.シンボル1();
	this.instance_3267.setTransform(288.5,36.35);

	this.instance_3268 = new lib.シンボル1();
	this.instance_3268.setTransform(398.5,110.05);

	this.instance_3269 = new lib.シンボル1();
	this.instance_3269.setTransform(380,96.55);

	this.instance_3270 = new lib.シンボル1();
	this.instance_3270.setTransform(194,49.85);

	this.instance_3271 = new lib.シンボル1();
	this.instance_3271.setTransform(175.5,36.35);

	this.instance_3272 = new lib.シンボル1();
	this.instance_3272.setTransform(375,75.05);

	this.instance_3273 = new lib.シンボル1();
	this.instance_3273.setTransform(356.5,61.55);

	this.instance_3274 = new lib.シンボル1();
	this.instance_3274.setTransform(170.5,14.85);

	this.instance_3275 = new lib.シンボル1();
	this.instance_3275.setTransform(152,1.35);

	this.instance_3276 = new lib.シンボル1();
	this.instance_3276.setTransform(262,75.05);

	this.instance_3277 = new lib.シンボル1();
	this.instance_3277.setTransform(243.5,61.55);

	this.instance_3278 = new lib.シンボル1();
	this.instance_3278.setTransform(57.5,14.85);

	this.instance_3279 = new lib.シンボル1();
	this.instance_3279.setTransform(39,1.35);

	this.instance_3280 = new lib.シンボル1();
	this.instance_3280.setTransform(474.5,170.25);

	this.instance_3281 = new lib.シンボル1();
	this.instance_3281.setTransform(456,156.75);

	this.instance_3282 = new lib.シンボル1();
	this.instance_3282.setTransform(270,110.05);

	this.instance_3283 = new lib.シンボル1();
	this.instance_3283.setTransform(251.5,96.55);

	this.instance_3284 = new lib.シンボル1();
	this.instance_3284.setTransform(361.5,170.25);

	this.instance_3285 = new lib.シンボル1();
	this.instance_3285.setTransform(343,156.75);

	this.instance_3286 = new lib.シンボル1();
	this.instance_3286.setTransform(157,110.05);

	this.instance_3287 = new lib.シンボル1();
	this.instance_3287.setTransform(138.5,96.55);

	this.instance_3288 = new lib.シンボル1();
	this.instance_3288.setTransform(338,135.25);

	this.instance_3289 = new lib.シンボル1();
	this.instance_3289.setTransform(319.5,121.75);

	this.instance_3290 = new lib.シンボル1();
	this.instance_3290.setTransform(133.5,75.05);

	this.instance_3291 = new lib.シンボル1();
	this.instance_3291.setTransform(115,61.55);

	this.instance_3292 = new lib.シンボル1();
	this.instance_3292.setTransform(225,135.25);

	this.instance_3293 = new lib.シンボル1();
	this.instance_3293.setTransform(206.5,121.75);

	this.instance_3294 = new lib.シンボル1();
	this.instance_3294.setTransform(46.5,113.55,1,1,0,0,180);

	this.instance_3295 = new lib.シンボル1();
	this.instance_3295.setTransform(65,100.05,1,1,0,0,180);

	this.instance_3296 = new lib.シンボル1();
	this.instance_3296.setTransform(459.5,56.55);

	this.instance_3297 = new lib.シンボル1();
	this.instance_3297.setTransform(441,43.05);

	this.instance_3298 = new lib.シンボル1();
	this.instance_3298.setTransform(412,9.85);

	this.instance_3299 = new lib.シンボル1();
	this.instance_3299.setTransform(393.5,-3.65);

	this.instance_3300 = new lib.シンボル1();
	this.instance_3300.setTransform(503.5,70.05);

	this.instance_3301 = new lib.シンボル1();
	this.instance_3301.setTransform(485,56.55);

	this.instance_3302 = new lib.シンボル1();
	this.instance_3302.setTransform(299,9.85);

	this.instance_3303 = new lib.シンボル1();
	this.instance_3303.setTransform(280.5,-3.65);

	this.instance_3304 = new lib.シンボル1();
	this.instance_3304.setTransform(480,35.05);

	this.instance_3305 = new lib.シンボル1();
	this.instance_3305.setTransform(461.5,21.55);

	this.instance_3306 = new lib.シンボル1();
	this.instance_3306.setTransform(275.5,-25.15);

	this.instance_3307 = new lib.シンボル1();
	this.instance_3307.setTransform(257,-38.65);

	this.instance_3308 = new lib.シンボル1();
	this.instance_3308.setTransform(367,35.05);

	this.instance_3309 = new lib.シンボル1();
	this.instance_3309.setTransform(348.5,21.55);

	this.instance_3310 = new lib.シンボル1();
	this.instance_3310.setTransform(162.5,-25.15);

	this.instance_3311 = new lib.シンボル1();
	this.instance_3311.setTransform(144,-38.65);

	this.instance_3312 = new lib.シンボル1();
	this.instance_3312.setTransform(422.5,116.75);

	this.instance_3313 = new lib.シンボル1();
	this.instance_3313.setTransform(404,103.25);

	this.instance_3314 = new lib.シンボル1();
	this.instance_3314.setTransform(375,70.05);

	this.instance_3315 = new lib.シンボル1();
	this.instance_3315.setTransform(356.5,56.55);

	this.instance_3316 = new lib.シンボル1();
	this.instance_3316.setTransform(466.5,130.25);

	this.instance_3317 = new lib.シンボル1();
	this.instance_3317.setTransform(448,116.75);

	this.instance_3318 = new lib.シンボル1();
	this.instance_3318.setTransform(262,70.05);

	this.instance_3319 = new lib.シンボル1();
	this.instance_3319.setTransform(243.5,56.55);

	this.instance_3320 = new lib.シンボル1();
	this.instance_3320.setTransform(443,95.25);

	this.instance_3321 = new lib.シンボル1();
	this.instance_3321.setTransform(424.5,81.75);

	this.instance_3322 = new lib.シンボル1();
	this.instance_3322.setTransform(238.5,35.05);

	this.instance_3323 = new lib.シンボル1();
	this.instance_3323.setTransform(220,21.55);

	this.instance_3324 = new lib.シンボル1();
	this.instance_3324.setTransform(330,95.25);

	this.instance_3325 = new lib.シンボル1();
	this.instance_3325.setTransform(311.5,81.75);

	this.instance_3326 = new lib.シンボル1();
	this.instance_3326.setTransform(125.5,35.05);

	this.instance_3327 = new lib.シンボル1();
	this.instance_3327.setTransform(107,21.55);

	this.instance_3328 = new lib.シンボル1();
	this.instance_3328.setTransform(449,133.05);

	this.instance_3329 = new lib.シンボル1();
	this.instance_3329.setTransform(430.5,119.55);

	this.instance_3330 = new lib.シンボル1();
	this.instance_3330.setTransform(244.5,72.85);

	this.instance_3331 = new lib.シンボル1();
	this.instance_3331.setTransform(226,59.35);

	this.instance_3332 = new lib.シンボル1();
	this.instance_3332.setTransform(336,133.05);

	this.instance_3333 = new lib.シンボル1();
	this.instance_3333.setTransform(317.5,119.55);

	this.instance_3334 = new lib.シンボル1();
	this.instance_3334.setTransform(131.5,72.85);

	this.instance_3335 = new lib.シンボル1();
	this.instance_3335.setTransform(113,59.35);

	this.instance_3336 = new lib.シンボル1();
	this.instance_3336.setTransform(312.5,98.05);

	this.instance_3337 = new lib.シンボル1();
	this.instance_3337.setTransform(294,84.55);

	this.instance_3338 = new lib.シンボル1();
	this.instance_3338.setTransform(108,37.85);

	this.instance_3339 = new lib.シンボル1();
	this.instance_3339.setTransform(89.5,24.35);

	this.instance_3340 = new lib.シンボル1();
	this.instance_3340.setTransform(199.5,98.05);

	this.instance_3341 = new lib.シンボル1();
	this.instance_3341.setTransform(181,84.55);

	this.instance_3342 = new lib.シンボル1();
	this.instance_3342.setTransform(72,76.35,1,1,0,0,180);

	this.instance_3343 = new lib.シンボル1();
	this.instance_3343.setTransform(90.5,62.85,1,1,0,0,180);

	this.instance_3344 = new lib.シンボル1();
	this.instance_3344.setTransform(412,193.25);

	this.instance_3345 = new lib.シンボル1();
	this.instance_3345.setTransform(393.5,179.75);

	this.instance_3346 = new lib.シンボル1();
	this.instance_3346.setTransform(207.5,133.05);

	this.instance_3347 = new lib.シンボル1();
	this.instance_3347.setTransform(189,119.55);

	this.instance_3348 = new lib.シンボル1();
	this.instance_3348.setTransform(299,193.25);

	this.instance_3349 = new lib.シンボル1();
	this.instance_3349.setTransform(280.5,179.75);

	this.instance_3350 = new lib.シンボル1();
	this.instance_3350.setTransform(94.5,133.05);

	this.instance_3351 = new lib.シンボル1();
	this.instance_3351.setTransform(76,119.55);

	this.instance_3352 = new lib.シンボル1();
	this.instance_3352.setTransform(275.5,158.25);

	this.instance_3353 = new lib.シンボル1();
	this.instance_3353.setTransform(257,144.75);

	this.instance_3354 = new lib.シンボル1();
	this.instance_3354.setTransform(71,98.05);

	this.instance_3355 = new lib.シンボル1();
	this.instance_3355.setTransform(52.5,84.55);

	this.instance_3356 = new lib.シンボル1();
	this.instance_3356.setTransform(162.5,158.25);

	this.instance_3357 = new lib.シンボル1();
	this.instance_3357.setTransform(144,144.75);

	this.instance_3358 = new lib.シンボル1();
	this.instance_3358.setTransform(109,136.55,1,1,0,0,180);

	this.instance_3359 = new lib.シンボル1();
	this.instance_3359.setTransform(127.5,123.05,1,1,0,0,180);

	this.instance_3360 = new lib.シンボル1();
	this.instance_3360.setTransform(397,79.55);

	this.instance_3361 = new lib.シンボル1();
	this.instance_3361.setTransform(535.5,79.55);

	this.instance_3362 = new lib.シンボル1();
	this.instance_3362.setTransform(349.5,32.85);

	this.instance_3363 = new lib.シンボル1();
	this.instance_3363.setTransform(331,19.35);

	this.instance_3364 = new lib.シンボル1();
	this.instance_3364.setTransform(441,93.05);

	this.instance_3365 = new lib.シンボル1();
	this.instance_3365.setTransform(422.5,79.55);

	this.instance_3366 = new lib.シンボル1();
	this.instance_3366.setTransform(236.5,32.85);

	this.instance_3367 = new lib.シンボル1();
	this.instance_3367.setTransform(218,19.35);

	this.instance_3368 = new lib.シンボル1();
	this.instance_3368.setTransform(417.5,58.05);

	this.instance_3369 = new lib.シンボル1();
	this.instance_3369.setTransform(399,44.55);

	this.instance_3370 = new lib.シンボル1();
	this.instance_3370.setTransform(213,-2.15);

	this.instance_3371 = new lib.シンボル1();
	this.instance_3371.setTransform(194.5,-15.65);

	this.instance_3372 = new lib.シンボル1();
	this.instance_3372.setTransform(304.5,58.05);

	this.instance_3373 = new lib.シンボル1();
	this.instance_3373.setTransform(286,44.55);

	this.instance_3374 = new lib.シンボル1();
	this.instance_3374.setTransform(100,-2.15);

	this.instance_3375 = new lib.シンボル1();
	this.instance_3375.setTransform(81.5,-15.65);

	this.instance_3376 = new lib.シンボル1();
	this.instance_3376.setTransform(517,153.25);

	this.instance_3377 = new lib.シンボル1();
	this.instance_3377.setTransform(498.5,139.75);

	this.instance_3378 = new lib.シンボル1();
	this.instance_3378.setTransform(312.5,93.05);

	this.instance_3379 = new lib.シンボル1();
	this.instance_3379.setTransform(294,79.55);

	this.instance_3380 = new lib.シンボル1();
	this.instance_3380.setTransform(404,153.25);

	this.instance_3381 = new lib.シンボル1();
	this.instance_3381.setTransform(385.5,139.75);

	this.instance_3382 = new lib.シンボル1();
	this.instance_3382.setTransform(199.5,93.05);

	this.instance_3383 = new lib.シンボル1();
	this.instance_3383.setTransform(181,79.55);

	this.instance_3384 = new lib.シンボル1();
	this.instance_3384.setTransform(380.5,118.25);

	this.instance_3385 = new lib.シンボル1();
	this.instance_3385.setTransform(362,104.75);

	this.instance_3386 = new lib.シンボル1();
	this.instance_3386.setTransform(176,58.05);

	this.instance_3387 = new lib.シンボル1();
	this.instance_3387.setTransform(157.5,44.55);

	this.instance_3388 = new lib.シンボル1();
	this.instance_3388.setTransform(267.5,118.25);

	this.instance_3389 = new lib.シンボル1();
	this.instance_3389.setTransform(249,104.75);

	this.instance_3390 = new lib.シンボル1();
	this.instance_3390.setTransform(63,58.05);

	this.instance_3391 = new lib.シンボル1();
	this.instance_3391.setTransform(44.5,44.55);

	this.instance_3392 = new lib.シンボル1();
	this.instance_3392.setTransform(353.5,146.55);

	this.instance_3393 = new lib.シンボル1();
	this.instance_3393.setTransform(335,133.05);

	this.instance_3394 = new lib.シンボル1();
	this.instance_3394.setTransform(149,86.35);

	this.instance_3395 = new lib.シンボル1();
	this.instance_3395.setTransform(130.5,72.85);

	this.instance_3396 = new lib.シンボル1();
	this.instance_3396.setTransform(240.5,146.55);

	this.instance_3397 = new lib.シンボル1();
	this.instance_3397.setTransform(222,133.05);

	this.instance_3398 = new lib.シンボル1();
	this.instance_3398.setTransform(36,86.35);

	this.instance_3399 = new lib.シンボル1();
	this.instance_3399.setTransform(49.5,111.35,1,1,0,0,180);

	this.instance_3400 = new lib.シンボル1();
	this.instance_3400.setTransform(217,111.55);

	this.instance_3401 = new lib.シンボル1();
	this.instance_3401.setTransform(198.5,98.05);

	this.instance_3402 = new lib.シンボル1();
	this.instance_3402.setTransform(54.5,89.85,1,1,0,0,180);

	this.instance_3403 = new lib.シンボル1();
	this.instance_3403.setTransform(73,76.35,1,1,0,0,180);

	this.instance_3404 = new lib.シンボル1();
	this.instance_3404.setTransform(104,111.55);

	this.instance_3405 = new lib.シンボル1();
	this.instance_3405.setTransform(85.5,98.05);

	this.instance_3406 = new lib.シンボル1();
	this.instance_3406.setTransform(167.5,89.85,1,1,0,0,180);

	this.instance_3407 = new lib.シンボル1();
	this.instance_3407.setTransform(186,76.35,1,1,0,0,180);

	this.instance_3408 = new lib.シンボル1();
	this.instance_3408.setTransform(316.5,206.75);

	this.instance_3409 = new lib.シンボル1();
	this.instance_3409.setTransform(298,193.25);

	this.instance_3410 = new lib.シンボル1();
	this.instance_3410.setTransform(112,146.55);

	this.instance_3411 = new lib.シンボル1();
	this.instance_3411.setTransform(93.5,133.05);

	this.instance_3412 = new lib.シンボル1();
	this.instance_3412.setTransform(203.5,206.75);

	this.instance_3413 = new lib.シンボル1();
	this.instance_3413.setTransform(185,193.25);

	this.instance_3414 = new lib.シンボル1();
	this.instance_3414.setTransform(68,185.05,1,1,0,0,180);

	this.instance_3415 = new lib.シンボル1();
	this.instance_3415.setTransform(86.5,171.55,1,1,0,0,180);

	this.instance_3416 = new lib.シンボル1();
	this.instance_3416.setTransform(180,171.75);

	this.instance_3417 = new lib.シンボル1();
	this.instance_3417.setTransform(161.5,158.25);

	this.instance_3418 = new lib.シンボル1();
	this.instance_3418.setTransform(91.5,150.05,1,1,0,0,180);

	this.instance_3419 = new lib.シンボル1();
	this.instance_3419.setTransform(110,136.55,1,1,0,0,180);

	this.instance_3420 = new lib.シンボル1();
	this.instance_3420.setTransform(67,171.75);

	this.instance_3421 = new lib.シンボル1();
	this.instance_3421.setTransform(48.5,158.25);

	this.instance_3422 = new lib.シンボル1();
	this.instance_3422.setTransform(204.5,150.05,1,1,0,0,180);

	this.instance_3423 = new lib.シンボル1();
	this.instance_3423.setTransform(223,136.55,1,1,0,0,180);

	this.instance_3424 = new lib.シンボル1();
	this.instance_3424.setTransform(458.5,106.55);

	this.instance_3425 = new lib.シンボル1();
	this.instance_3425.setTransform(440,93.05);

	this.instance_3426 = new lib.シンボル1();
	this.instance_3426.setTransform(254,46.35);

	this.instance_3427 = new lib.シンボル1();
	this.instance_3427.setTransform(235.5,32.85);

	this.instance_3428 = new lib.シンボル1();
	this.instance_3428.setTransform(345.5,106.55);

	this.instance_3429 = new lib.シンボル1();
	this.instance_3429.setTransform(327,93.05);

	this.instance_3430 = new lib.シンボル1();
	this.instance_3430.setTransform(141,46.35);

	this.instance_3431 = new lib.シンボル1();
	this.instance_3431.setTransform(122.5,32.85);

	this.instance_3432 = new lib.シンボル1();
	this.instance_3432.setTransform(322,71.55);

	this.instance_3433 = new lib.シンボル1();
	this.instance_3433.setTransform(303.5,58.05);

	this.instance_3434 = new lib.シンボル1();
	this.instance_3434.setTransform(117.5,11.35);

	this.instance_3435 = new lib.シンボル1();
	this.instance_3435.setTransform(99,-2.15);

	this.instance_3436 = new lib.シンボル1();
	this.instance_3436.setTransform(209,71.55);

	this.instance_3437 = new lib.シンボル1();
	this.instance_3437.setTransform(190.5,58.05);

	this.instance_3438 = new lib.シンボル1();
	this.instance_3438.setTransform(62.5,49.85,1,1,0,0,180);

	this.instance_3439 = new lib.シンボル1();
	this.instance_3439.setTransform(81,36.35,1,1,0,0,180);

	this.instance_3440 = new lib.シンボル1();
	this.instance_3440.setTransform(421.5,166.75);

	this.instance_3441 = new lib.シンボル1();
	this.instance_3441.setTransform(403,153.25);

	this.instance_3442 = new lib.シンボル1();
	this.instance_3442.setTransform(217,106.55);

	this.instance_3443 = new lib.シンボル1();
	this.instance_3443.setTransform(198.5,93.05);

	this.instance_3444 = new lib.シンボル1();
	this.instance_3444.setTransform(308.5,166.75);

	this.instance_3445 = new lib.シンボル1();
	this.instance_3445.setTransform(290,153.25);

	this.instance_3446 = new lib.シンボル1();
	this.instance_3446.setTransform(104,106.55);

	this.instance_3447 = new lib.シンボル1();
	this.instance_3447.setTransform(85.5,93.05);

	this.instance_3448 = new lib.シンボル1();
	this.instance_3448.setTransform(285,131.75);

	this.instance_3449 = new lib.シンボル1();
	this.instance_3449.setTransform(266.5,118.25);

	this.instance_3450 = new lib.シンボル1();
	this.instance_3450.setTransform(80.5,71.55);

	this.instance_3451 = new lib.シンボル1();
	this.instance_3451.setTransform(62,58.05);

	this.instance_3452 = new lib.シンボル1();
	this.instance_3452.setTransform(172,131.75);

	this.instance_3453 = new lib.シンボル1();
	this.instance_3453.setTransform(153.5,118.25);

	this.instance_3454 = new lib.シンボル1();
	this.instance_3454.setTransform(99.5,110.05,1,1,0,0,180);

	this.instance_3455 = new lib.シンボル1();
	this.instance_3455.setTransform(118,96.55,1,1,0,0,180);

	this.instance_3456 = new lib.シンボル1();
	this.instance_3456.setTransform(537,110.05);

	this.instance_3457 = new lib.シンボル1();
	this.instance_3457.setTransform(518.5,96.55);

	this.instance_3458 = new lib.シンボル1();
	this.instance_3458.setTransform(332.5,49.85);

	this.instance_3459 = new lib.シンボル1();
	this.instance_3459.setTransform(314,36.35);

	this.instance_3460 = new lib.シンボル1();
	this.instance_3460.setTransform(424,110.05);

	this.instance_3461 = new lib.シンボル1();
	this.instance_3461.setTransform(405.5,96.55);

	this.instance_3462 = new lib.シンボル1();
	this.instance_3462.setTransform(219.5,49.85);

	this.instance_3463 = new lib.シンボル1();
	this.instance_3463.setTransform(201,36.35);

	this.instance_3464 = new lib.シンボル1();
	this.instance_3464.setTransform(400.5,75.05);

	this.instance_3465 = new lib.シンボル1();
	this.instance_3465.setTransform(382,61.55);

	this.instance_3466 = new lib.シンボル1();
	this.instance_3466.setTransform(196,14.85);

	this.instance_3467 = new lib.シンボル1();
	this.instance_3467.setTransform(177.5,1.35);

	this.instance_3468 = new lib.シンボル1();
	this.instance_3468.setTransform(287.5,75.05);

	this.instance_3469 = new lib.シンボル1();
	this.instance_3469.setTransform(269,61.55);

	this.instance_3470 = new lib.シンボル1();
	this.instance_3470.setTransform(83,14.85);

	this.instance_3471 = new lib.シンボル1();
	this.instance_3471.setTransform(64.5,1.35);

	this.instance_3472 = new lib.シンボル1();
	this.instance_3472.setTransform(500,170.25);

	this.instance_3473 = new lib.シンボル1();
	this.instance_3473.setTransform(481.5,156.75);

	this.instance_3474 = new lib.シンボル1();
	this.instance_3474.setTransform(295.5,110.05);

	this.instance_3475 = new lib.シンボル1();
	this.instance_3475.setTransform(277,96.55);

	this.instance_3476 = new lib.シンボル1();
	this.instance_3476.setTransform(387,170.25);

	this.instance_3477 = new lib.シンボル1();
	this.instance_3477.setTransform(368.5,156.75);

	this.instance_3478 = new lib.シンボル1();
	this.instance_3478.setTransform(182.5,110.05);

	this.instance_3479 = new lib.シンボル1();
	this.instance_3479.setTransform(164,96.55);

	this.instance_3480 = new lib.シンボル1();
	this.instance_3480.setTransform(363.5,135.25);

	this.instance_3481 = new lib.シンボル1();
	this.instance_3481.setTransform(345,121.75);

	this.instance_3482 = new lib.シンボル1();
	this.instance_3482.setTransform(159,75.05);

	this.instance_3483 = new lib.シンボル1();
	this.instance_3483.setTransform(140.5,61.55);

	this.instance_3484 = new lib.シンボル1();
	this.instance_3484.setTransform(250.5,135.25);

	this.instance_3485 = new lib.シンボル1();
	this.instance_3485.setTransform(232,121.75);

	this.instance_3486 = new lib.シンボル1();
	this.instance_3486.setTransform(46,75.05);

	this.instance_3487 = new lib.シンボル1();
	this.instance_3487.setTransform(39.5,100.05,1,1,0,0,180);

	this.instance_3488 = new lib.シンボル1();
	this.instance_3488.setTransform(485,56.55);

	this.instance_3489 = new lib.シンボル1();
	this.instance_3489.setTransform(466.5,43.05);

	this.instance_3490 = new lib.シンボル1();
	this.instance_3490.setTransform(437.5,9.85);

	this.instance_3491 = new lib.シンボル1();
	this.instance_3491.setTransform(419,-3.65);

	this.instance_3492 = new lib.シンボル1();
	this.instance_3492.setTransform(529,70.05);

	this.instance_3493 = new lib.シンボル1();
	this.instance_3493.setTransform(510.5,56.55);

	this.instance_3494 = new lib.シンボル1();
	this.instance_3494.setTransform(324.5,9.85);

	this.instance_3495 = new lib.シンボル1();
	this.instance_3495.setTransform(306,-3.65);

	this.instance_3496 = new lib.シンボル1();
	this.instance_3496.setTransform(505.5,35.05);

	this.instance_3497 = new lib.シンボル1();
	this.instance_3497.setTransform(487,21.55);

	this.instance_3498 = new lib.シンボル1();
	this.instance_3498.setTransform(301,-25.15);

	this.instance_3499 = new lib.シンボル1();
	this.instance_3499.setTransform(282.5,-38.65);

	this.instance_3500 = new lib.シンボル1();
	this.instance_3500.setTransform(392.5,35.05);

	this.instance_3501 = new lib.シンボル1();
	this.instance_3501.setTransform(374,21.55);

	this.instance_3502 = new lib.シンボル1();
	this.instance_3502.setTransform(188,-25.15);

	this.instance_3503 = new lib.シンボル1();
	this.instance_3503.setTransform(169.5,-38.65);

	this.instance_3504 = new lib.シンボル1();
	this.instance_3504.setTransform(448,116.75);

	this.instance_3505 = new lib.シンボル1();
	this.instance_3505.setTransform(429.5,103.25);

	this.instance_3506 = new lib.シンボル1();
	this.instance_3506.setTransform(400.5,70.05);

	this.instance_3507 = new lib.シンボル1();
	this.instance_3507.setTransform(382,56.55);

	this.instance_3508 = new lib.シンボル1();
	this.instance_3508.setTransform(492,130.25);

	this.instance_3509 = new lib.シンボル1();
	this.instance_3509.setTransform(473.5,116.75);

	this.instance_3510 = new lib.シンボル1();
	this.instance_3510.setTransform(287.5,70.05);

	this.instance_3511 = new lib.シンボル1();
	this.instance_3511.setTransform(269,56.55);

	this.instance_3512 = new lib.シンボル1();
	this.instance_3512.setTransform(468.5,95.25);

	this.instance_3513 = new lib.シンボル1();
	this.instance_3513.setTransform(450,81.75);

	this.instance_3514 = new lib.シンボル1();
	this.instance_3514.setTransform(264,35.05);

	this.instance_3515 = new lib.シンボル1();
	this.instance_3515.setTransform(245.5,21.55);

	this.instance_3516 = new lib.シンボル1();
	this.instance_3516.setTransform(355.5,95.25);

	this.instance_3517 = new lib.シンボル1();
	this.instance_3517.setTransform(337,81.75);

	this.instance_3518 = new lib.シンボル1();
	this.instance_3518.setTransform(151,35.05);

	this.instance_3519 = new lib.シンボル1();
	this.instance_3519.setTransform(132.5,21.55);

	this.instance_3520 = new lib.シンボル1();
	this.instance_3520.setTransform(441.5,123.55);

	this.instance_3521 = new lib.シンボル1();
	this.instance_3521.setTransform(423,110.05);

	this.instance_3522 = new lib.シンボル1();
	this.instance_3522.setTransform(237,63.35);

	this.instance_3523 = new lib.シンボル1();
	this.instance_3523.setTransform(218.5,49.85);

	this.instance_3524 = new lib.シンボル1();
	this.instance_3524.setTransform(328.5,123.55);

	this.instance_3525 = new lib.シンボル1();
	this.instance_3525.setTransform(310,110.05);

	this.instance_3526 = new lib.シンボル1();
	this.instance_3526.setTransform(124,63.35);

	this.instance_3527 = new lib.シンボル1();
	this.instance_3527.setTransform(105.5,49.85);

	this.instance_3528 = new lib.シンボル1();
	this.instance_3528.setTransform(305,88.55);

	this.instance_3529 = new lib.シンボル1();
	this.instance_3529.setTransform(286.5,75.05);

	this.instance_3530 = new lib.シンボル1();
	this.instance_3530.setTransform(100.5,28.35);

	this.instance_3531 = new lib.シンボル1();
	this.instance_3531.setTransform(82,14.85);

	this.instance_3532 = new lib.シンボル1();
	this.instance_3532.setTransform(192,88.55);

	this.instance_3533 = new lib.シンボル1();
	this.instance_3533.setTransform(173.5,75.05);

	this.instance_3534 = new lib.シンボル1();
	this.instance_3534.setTransform(79.5,66.85,1,1,0,0,180);

	this.instance_3535 = new lib.シンボル1();
	this.instance_3535.setTransform(98,53.35,1,1,0,0,180);

	this.instance_3536 = new lib.シンボル1();
	this.instance_3536.setTransform(404.5,183.75);

	this.instance_3537 = new lib.シンボル1();
	this.instance_3537.setTransform(386,170.25);

	this.instance_3538 = new lib.シンボル1();
	this.instance_3538.setTransform(200,123.55);

	this.instance_3539 = new lib.シンボル1();
	this.instance_3539.setTransform(181.5,110.05);

	this.instance_3540 = new lib.シンボル1();
	this.instance_3540.setTransform(291.5,183.75);

	this.instance_3541 = new lib.シンボル1();
	this.instance_3541.setTransform(273,170.25);

	this.instance_3542 = new lib.シンボル1();
	this.instance_3542.setTransform(87,123.55);

	this.instance_3543 = new lib.シンボル1();
	this.instance_3543.setTransform(68.5,110.05);

	this.instance_3544 = new lib.シンボル1();
	this.instance_3544.setTransform(268,148.75);

	this.instance_3545 = new lib.シンボル1();
	this.instance_3545.setTransform(249.5,135.25);

	this.instance_3546 = new lib.シンボル1();
	this.instance_3546.setTransform(63.5,88.55);

	this.instance_3547 = new lib.シンボル1();
	this.instance_3547.setTransform(45,75.05);

	this.instance_3548 = new lib.シンボル1();
	this.instance_3548.setTransform(155,148.75);

	this.instance_3549 = new lib.シンボル1();
	this.instance_3549.setTransform(136.5,135.25);

	this.instance_3550 = new lib.シンボル1();
	this.instance_3550.setTransform(116.5,127.05,1,1,0,0,180);

	this.instance_3551 = new lib.シンボル1();
	this.instance_3551.setTransform(135,113.55,1,1,0,0,180);

	this.instance_3552 = new lib.シンボル1();
	this.instance_3552.setTransform(546.5,83.55);

	this.instance_3553 = new lib.シンボル1();
	this.instance_3553.setTransform(528,70.05);

	this.instance_3554 = new lib.シンボル1();
	this.instance_3554.setTransform(342,23.35);

	this.instance_3555 = new lib.シンボル1();
	this.instance_3555.setTransform(323.5,9.85);

	this.instance_3556 = new lib.シンボル1();
	this.instance_3556.setTransform(433.5,83.55);

	this.instance_3557 = new lib.シンボル1();
	this.instance_3557.setTransform(415,70.05);

	this.instance_3558 = new lib.シンボル1();
	this.instance_3558.setTransform(229,23.35);

	this.instance_3559 = new lib.シンボル1();
	this.instance_3559.setTransform(210.5,9.85);

	this.instance_3560 = new lib.シンボル1();
	this.instance_3560.setTransform(410,48.55);

	this.instance_3561 = new lib.シンボル1();
	this.instance_3561.setTransform(391.5,35.05);

	this.instance_3562 = new lib.シンボル1();
	this.instance_3562.setTransform(205.5,-11.65);

	this.instance_3563 = new lib.シンボル1();
	this.instance_3563.setTransform(187,-25.15);

	this.instance_3564 = new lib.シンボル1();
	this.instance_3564.setTransform(297,48.55);

	this.instance_3565 = new lib.シンボル1();
	this.instance_3565.setTransform(278.5,35.05);

	this.instance_3566 = new lib.シンボル1();
	this.instance_3566.setTransform(92.5,-11.65);

	this.instance_3567 = new lib.シンボル1();
	this.instance_3567.setTransform(74,-25.15);

	this.instance_3568 = new lib.シンボル1();
	this.instance_3568.setTransform(509.5,143.75);

	this.instance_3569 = new lib.シンボル1();
	this.instance_3569.setTransform(491,130.25);

	this.instance_3570 = new lib.シンボル1();
	this.instance_3570.setTransform(305,83.55);

	this.instance_3571 = new lib.シンボル1();
	this.instance_3571.setTransform(286.5,70.05);

	this.instance_3572 = new lib.シンボル1();
	this.instance_3572.setTransform(396.5,143.75);

	this.instance_3573 = new lib.シンボル1();
	this.instance_3573.setTransform(378,130.25);

	this.instance_3574 = new lib.シンボル1();
	this.instance_3574.setTransform(192,83.55);

	this.instance_3575 = new lib.シンボル1();
	this.instance_3575.setTransform(173.5,70.05);

	this.instance_3576 = new lib.シンボル1();
	this.instance_3576.setTransform(373,108.75);

	this.instance_3577 = new lib.シンボル1();
	this.instance_3577.setTransform(354.5,95.25);

	this.instance_3578 = new lib.シンボル1();
	this.instance_3578.setTransform(168.5,48.55);

	this.instance_3579 = new lib.シンボル1();
	this.instance_3579.setTransform(150,35.05);

	this.instance_3580 = new lib.シンボル1();
	this.instance_3580.setTransform(260,108.75);

	this.instance_3581 = new lib.シンボル1();
	this.instance_3581.setTransform(241.5,95.25);

	this.instance_3582 = new lib.シンボル1();
	this.instance_3582.setTransform(55.5,48.55);

	this.instance_3583 = new lib.シンボル1();
	this.instance_3583.setTransform(37,35.05);

	this.instance_3584 = new lib.シンボル1();
	this.instance_3584.setTransform(494,96.55);

	this.instance_3585 = new lib.シンボル1();
	this.instance_3585.setTransform(475.5,83.05);

	this.instance_3586 = new lib.シンボル1();
	this.instance_3586.setTransform(289.5,36.35);

	this.instance_3587 = new lib.シンボル1();
	this.instance_3587.setTransform(271,22.85);

	this.instance_3588 = new lib.シンボル1();
	this.instance_3588.setTransform(381,96.55);

	this.instance_3589 = new lib.シンボル1();
	this.instance_3589.setTransform(362.5,83.05);

	this.instance_3590 = new lib.シンボル1();
	this.instance_3590.setTransform(176.5,36.35);

	this.instance_3591 = new lib.シンボル1();
	this.instance_3591.setTransform(158,22.85);

	this.instance_3592 = new lib.シンボル1();
	this.instance_3592.setTransform(357.5,61.55);

	this.instance_3593 = new lib.シンボル1();
	this.instance_3593.setTransform(339,48.05);

	this.instance_3594 = new lib.シンボル1();
	this.instance_3594.setTransform(153,1.35);

	this.instance_3595 = new lib.シンボル1();
	this.instance_3595.setTransform(134.5,-12.15);

	this.instance_3596 = new lib.シンボル1();
	this.instance_3596.setTransform(244.5,61.55);

	this.instance_3597 = new lib.シンボル1();
	this.instance_3597.setTransform(226,48.05);

	this.instance_3598 = new lib.シンボル1();
	this.instance_3598.setTransform(40,1.35);

	this.instance_3599 = new lib.シンボル1();
	this.instance_3599.setTransform(21.5,-12.15);

	this.instance_3600 = new lib.シンボル1();
	this.instance_3600.setTransform(457,156.75);

	this.instance_3601 = new lib.シンボル1();
	this.instance_3601.setTransform(438.5,143.25);

	this.instance_3602 = new lib.シンボル1();
	this.instance_3602.setTransform(252.5,96.55);

	this.instance_3603 = new lib.シンボル1();
	this.instance_3603.setTransform(234,83.05);

	this.instance_3604 = new lib.シンボル1();
	this.instance_3604.setTransform(344,156.75);

	this.instance_3605 = new lib.シンボル1();
	this.instance_3605.setTransform(325.5,143.25);

	this.instance_3606 = new lib.シンボル1();
	this.instance_3606.setTransform(139.5,96.55);

	this.instance_3607 = new lib.シンボル1();
	this.instance_3607.setTransform(121,83.05);

	this.instance_3608 = new lib.シンボル1();
	this.instance_3608.setTransform(320.5,121.75);

	this.instance_3609 = new lib.シンボル1();
	this.instance_3609.setTransform(302,108.25);

	this.instance_3610 = new lib.シンボル1();
	this.instance_3610.setTransform(116,61.55);

	this.instance_3611 = new lib.シンボル1();
	this.instance_3611.setTransform(97.5,48.05);

	this.instance_3612 = new lib.シンボル1();
	this.instance_3612.setTransform(207.5,121.75);

	this.instance_3613 = new lib.シンボル1();
	this.instance_3613.setTransform(189,108.25);

	this.instance_3614 = new lib.シンボル1();
	this.instance_3614.setTransform(14,100.05,1,1,0,0,180);

	this.instance_3615 = new lib.シンボル1();
	this.instance_3615.setTransform(32.5,86.55,1,1,0,0,180);

	this.instance_3616 = new lib.シンボル1();
	this.instance_3616.setTransform(442,43.05);

	this.instance_3617 = new lib.シンボル1();
	this.instance_3617.setTransform(423.5,29.55);

	this.instance_3618 = new lib.シンボル1();
	this.instance_3618.setTransform(394.5,-3.65);

	this.instance_3619 = new lib.シンボル1();
	this.instance_3619.setTransform(376,-17.15);

	this.instance_3620 = new lib.シンボル1();
	this.instance_3620.setTransform(486,56.55);

	this.instance_3621 = new lib.シンボル1();
	this.instance_3621.setTransform(467.5,43.05);

	this.instance_3622 = new lib.シンボル1();
	this.instance_3622.setTransform(281.5,-3.65);

	this.instance_3623 = new lib.シンボル1();
	this.instance_3623.setTransform(263,-17.15);

	this.instance_3624 = new lib.シンボル1();
	this.instance_3624.setTransform(462.5,21.55);

	this.instance_3625 = new lib.シンボル1();
	this.instance_3625.setTransform(444,8.05);

	this.instance_3626 = new lib.シンボル1();
	this.instance_3626.setTransform(258,-38.65);

	this.instance_3627 = new lib.シンボル1();
	this.instance_3627.setTransform(239.5,-52.15);

	this.instance_3628 = new lib.シンボル1();
	this.instance_3628.setTransform(349.5,21.55);

	this.instance_3629 = new lib.シンボル1();
	this.instance_3629.setTransform(331,8.05);

	this.instance_3630 = new lib.シンボル1();
	this.instance_3630.setTransform(145,-38.65);

	this.instance_3631 = new lib.シンボル1();
	this.instance_3631.setTransform(126.5,-52.15);

	this.instance_3632 = new lib.シンボル1();
	this.instance_3632.setTransform(405,103.25);

	this.instance_3633 = new lib.シンボル1();
	this.instance_3633.setTransform(386.5,89.75);

	this.instance_3634 = new lib.シンボル1();
	this.instance_3634.setTransform(357.5,56.55);

	this.instance_3635 = new lib.シンボル1();
	this.instance_3635.setTransform(339,43.05);

	this.instance_3636 = new lib.シンボル1();
	this.instance_3636.setTransform(449,116.75);

	this.instance_3637 = new lib.シンボル1();
	this.instance_3637.setTransform(430.5,103.25);

	this.instance_3638 = new lib.シンボル1();
	this.instance_3638.setTransform(244.5,56.55);

	this.instance_3639 = new lib.シンボル1();
	this.instance_3639.setTransform(226,43.05);

	this.instance_3640 = new lib.シンボル1();
	this.instance_3640.setTransform(425.5,81.75);

	this.instance_3641 = new lib.シンボル1();
	this.instance_3641.setTransform(407,68.25);

	this.instance_3642 = new lib.シンボル1();
	this.instance_3642.setTransform(221,21.55);

	this.instance_3643 = new lib.シンボル1();
	this.instance_3643.setTransform(202.5,8.05);

	this.instance_3644 = new lib.シンボル1();
	this.instance_3644.setTransform(312.5,81.75);

	this.instance_3645 = new lib.シンボル1();
	this.instance_3645.setTransform(294,68.25);

	this.instance_3646 = new lib.シンボル1();
	this.instance_3646.setTransform(108,21.55);

	this.instance_3647 = new lib.シンボル1();
	this.instance_3647.setTransform(89.5,8.05);

	this.instance_3648 = new lib.シンボル1();
	this.instance_3648.setTransform(398.5,110.05);

	this.instance_3649 = new lib.シンボル1();
	this.instance_3649.setTransform(380,96.55);

	this.instance_3650 = new lib.シンボル1();
	this.instance_3650.setTransform(194,49.85);

	this.instance_3651 = new lib.シンボル1();
	this.instance_3651.setTransform(175.5,36.35);

	this.instance_3652 = new lib.シンボル1();
	this.instance_3652.setTransform(285.5,110.05);

	this.instance_3653 = new lib.シンボル1();
	this.instance_3653.setTransform(267,96.55);

	this.instance_3654 = new lib.シンボル1();
	this.instance_3654.setTransform(81,49.85);

	this.instance_3655 = new lib.シンボル1();
	this.instance_3655.setTransform(62.5,36.35);

	this.instance_3656 = new lib.シンボル1();
	this.instance_3656.setTransform(262,75.05);

	this.instance_3657 = new lib.シンボル1();
	this.instance_3657.setTransform(243.5,61.55);

	this.instance_3658 = new lib.シンボル1();
	this.instance_3658.setTransform(57.5,14.85);

	this.instance_3659 = new lib.シンボル1();
	this.instance_3659.setTransform(39,1.35);

	this.instance_3660 = new lib.シンボル1();
	this.instance_3660.setTransform(149,75.05);

	this.instance_3661 = new lib.シンボル1();
	this.instance_3661.setTransform(130.5,61.55);

	this.instance_3662 = new lib.シンボル1();
	this.instance_3662.setTransform(72.5,53.35,1,1,0,0,180);

	this.instance_3663 = new lib.シンボル1();
	this.instance_3663.setTransform(91,39.85,1,1,0,0,180);

	this.instance_3664 = new lib.シンボル1();
	this.instance_3664.setTransform(361.5,170.25);

	this.instance_3665 = new lib.シンボル1();
	this.instance_3665.setTransform(343,156.75);

	this.instance_3666 = new lib.シンボル1();
	this.instance_3666.setTransform(157,110.05);

	this.instance_3667 = new lib.シンボル1();
	this.instance_3667.setTransform(138.5,96.55);

	this.instance_3668 = new lib.シンボル1();
	this.instance_3668.setTransform(248.5,170.25);

	this.instance_3669 = new lib.シンボル1();
	this.instance_3669.setTransform(230,156.75);

	this.instance_3670 = new lib.シンボル1();
	this.instance_3670.setTransform(44,110.05);

	this.instance_3671 = new lib.シンボル1();
	this.instance_3671.setTransform(25.5,96.55);

	this.instance_3672 = new lib.シンボル1();
	this.instance_3672.setTransform(225,135.25);

	this.instance_3673 = new lib.シンボル1();
	this.instance_3673.setTransform(206.5,121.75);

	this.instance_3674 = new lib.シンボル1();
	this.instance_3674.setTransform(20.5,75.05);

	this.instance_3675 = new lib.シンボル1();
	this.instance_3675.setTransform(15,100.05,1,1,0,0,180);

	this.instance_3676 = new lib.シンボル1();
	this.instance_3676.setTransform(112,135.25);

	this.instance_3677 = new lib.シンボル1();
	this.instance_3677.setTransform(93.5,121.75);

	this.instance_3678 = new lib.シンボル1();
	this.instance_3678.setTransform(109.5,113.55,1,1,0,0,180);

	this.instance_3679 = new lib.シンボル1();
	this.instance_3679.setTransform(128,100.05,1,1,0,0,180);

	this.instance_3680 = new lib.シンボル1();
	this.instance_3680.setTransform(503.5,70.05);

	this.instance_3681 = new lib.シンボル1();
	this.instance_3681.setTransform(485,56.55);

	this.instance_3682 = new lib.シンボル1();
	this.instance_3682.setTransform(299,9.85);

	this.instance_3683 = new lib.シンボル1();
	this.instance_3683.setTransform(280.5,-3.65);

	this.instance_3684 = new lib.シンボル1();
	this.instance_3684.setTransform(390.5,70.05);

	this.instance_3685 = new lib.シンボル1();
	this.instance_3685.setTransform(372,56.55);

	this.instance_3686 = new lib.シンボル1();
	this.instance_3686.setTransform(186,9.85);

	this.instance_3687 = new lib.シンボル1();
	this.instance_3687.setTransform(167.5,-3.65);

	this.instance_3688 = new lib.シンボル1();
	this.instance_3688.setTransform(367,35.05);

	this.instance_3689 = new lib.シンボル1();
	this.instance_3689.setTransform(348.5,21.55);

	this.instance_3690 = new lib.シンボル1();
	this.instance_3690.setTransform(162.5,-25.15);

	this.instance_3691 = new lib.シンボル1();
	this.instance_3691.setTransform(144,-38.65);

	this.instance_3692 = new lib.シンボル1();
	this.instance_3692.setTransform(254,35.05);

	this.instance_3693 = new lib.シンボル1();
	this.instance_3693.setTransform(235.5,21.55);

	this.instance_3694 = new lib.シンボル1();
	this.instance_3694.setTransform(49.5,-25.15);

	this.instance_3695 = new lib.シンボル1();
	this.instance_3695.setTransform(31,-38.65);

	this.instance_3696 = new lib.シンボル1();
	this.instance_3696.setTransform(466.5,130.25);

	this.instance_3697 = new lib.シンボル1();
	this.instance_3697.setTransform(448,116.75);

	this.instance_3698 = new lib.シンボル1();
	this.instance_3698.setTransform(262,70.05);

	this.instance_3699 = new lib.シンボル1();
	this.instance_3699.setTransform(243.5,56.55);

	this.instance_3700 = new lib.シンボル1();
	this.instance_3700.setTransform(353.5,130.25);

	this.instance_3701 = new lib.シンボル1();
	this.instance_3701.setTransform(335,116.75);

	this.instance_3702 = new lib.シンボル1();
	this.instance_3702.setTransform(149,70.05);

	this.instance_3703 = new lib.シンボル1();
	this.instance_3703.setTransform(130.5,56.55);

	this.instance_3704 = new lib.シンボル1();
	this.instance_3704.setTransform(330,95.25);

	this.instance_3705 = new lib.シンボル1();
	this.instance_3705.setTransform(311.5,81.75);

	this.instance_3706 = new lib.シンボル1();
	this.instance_3706.setTransform(125.5,35.05);

	this.instance_3707 = new lib.シンボル1();
	this.instance_3707.setTransform(107,21.55);

	this.instance_3708 = new lib.シンボル1();
	this.instance_3708.setTransform(217,95.25);

	this.instance_3709 = new lib.シンボル1();
	this.instance_3709.setTransform(198.5,81.75);

	this.instance_3710 = new lib.シンボル1();
	this.instance_3710.setTransform(12.5,35.05);

	this.instance_3711 = new lib.シンボル1();
	this.instance_3711.setTransform(23,60.05,1,1,0,0,180);

	this.instance_3712 = new lib.シンボル1();
	this.instance_3712.setTransform(425,60.05);

	this.instance_3713 = new lib.シンボル1();
	this.instance_3713.setTransform(406.5,46.55);

	this.instance_3714 = new lib.シンボル1();
	this.instance_3714.setTransform(377.5,13.35);

	this.instance_3715 = new lib.シンボル1();
	this.instance_3715.setTransform(359,-0.15);

	this.instance_3716 = new lib.シンボル1();
	this.instance_3716.setTransform(469,73.55);

	this.instance_3717 = new lib.シンボル1();
	this.instance_3717.setTransform(450.5,60.05);

	this.instance_3718 = new lib.シンボル1();
	this.instance_3718.setTransform(264.5,13.35);

	this.instance_3719 = new lib.シンボル1();
	this.instance_3719.setTransform(246,-0.15);

	this.instance_3720 = new lib.シンボル1();
	this.instance_3720.setTransform(445.5,38.55);

	this.instance_3721 = new lib.シンボル1();
	this.instance_3721.setTransform(427,25.05);

	this.instance_3722 = new lib.シンボル1();
	this.instance_3722.setTransform(241,-21.65);

	this.instance_3723 = new lib.シンボル1();
	this.instance_3723.setTransform(222.5,-35.15);

	this.instance_3724 = new lib.シンボル1();
	this.instance_3724.setTransform(332.5,38.55);

	this.instance_3725 = new lib.シンボル1();
	this.instance_3725.setTransform(314,25.05);

	this.instance_3726 = new lib.シンボル1();
	this.instance_3726.setTransform(128,-21.65);

	this.instance_3727 = new lib.シンボル1();
	this.instance_3727.setTransform(109.5,-35.15);

	this.instance_3728 = new lib.シンボル1();
	this.instance_3728.setTransform(388,120.25);

	this.instance_3729 = new lib.シンボル1();
	this.instance_3729.setTransform(526.5,120.25);

	this.instance_3730 = new lib.シンボル1();
	this.instance_3730.setTransform(340.5,73.55);

	this.instance_3731 = new lib.シンボル1();
	this.instance_3731.setTransform(322,60.05);

	this.instance_3732 = new lib.シンボル1();
	this.instance_3732.setTransform(432,133.75);

	this.instance_3733 = new lib.シンボル1();
	this.instance_3733.setTransform(413.5,120.25);

	this.instance_3734 = new lib.シンボル1();
	this.instance_3734.setTransform(227.5,73.55);

	this.instance_3735 = new lib.シンボル1();
	this.instance_3735.setTransform(209,60.05);

	this.instance_3736 = new lib.シンボル1();
	this.instance_3736.setTransform(408.5,98.75);

	this.instance_3737 = new lib.シンボル1();
	this.instance_3737.setTransform(390,85.25);

	this.instance_3738 = new lib.シンボル1();
	this.instance_3738.setTransform(204,38.55);

	this.instance_3739 = new lib.シンボル1();
	this.instance_3739.setTransform(185.5,25.05);

	this.instance_3740 = new lib.シンボル1();
	this.instance_3740.setTransform(295.5,98.75);

	this.instance_3741 = new lib.シンボル1();
	this.instance_3741.setTransform(277,85.25);

	this.instance_3742 = new lib.シンボル1();
	this.instance_3742.setTransform(91,38.55);

	this.instance_3743 = new lib.シンボル1();
	this.instance_3743.setTransform(72.5,25.05);

	this.instance_3744 = new lib.シンボル1();
	this.instance_3744.setTransform(530,20.05);

	this.instance_3745 = new lib.シンボル1();
	this.instance_3745.setTransform(511.5,6.55);

	this.instance_3746 = new lib.シンボル1();
	this.instance_3746.setTransform(482.5,-26.65);

	this.instance_3747 = new lib.シンボル1();
	this.instance_3747.setTransform(464,-40.15);

	this.instance_3748 = new lib.シンボル1();
	this.instance_3748.setTransform(417,20.05);

	this.instance_3749 = new lib.シンボル1();
	this.instance_3749.setTransform(398.5,6.55);

	this.instance_3750 = new lib.シンボル1();
	this.instance_3750.setTransform(369.5,-26.65);

	this.instance_3751 = new lib.シンボル1();
	this.instance_3751.setTransform(351,-40.15);

	this.instance_3752 = new lib.シンボル1();
	this.instance_3752.setTransform(393.5,-14.95);

	this.instance_3753 = new lib.シンボル1();
	this.instance_3753.setTransform(375,-28.45);

	this.instance_3754 = new lib.シンボル1();
	this.instance_3754.setTransform(346,-61.65);

	this.instance_3755 = new lib.シンボル1();
	this.instance_3755.setTransform(327.5,-75.15);

	this.instance_3756 = new lib.シンボル1();
	this.instance_3756.setTransform(437.5,-1.45);

	this.instance_3757 = new lib.シンボル1();
	this.instance_3757.setTransform(419,-14.95);

	this.instance_3758 = new lib.シンボル1();
	this.instance_3758.setTransform(233,-61.65);

	this.instance_3759 = new lib.シンボル1();
	this.instance_3759.setTransform(214.5,-75.15);

	this.instance_3760 = new lib.シンボル1();
	this.instance_3760.setTransform(493,80.25);

	this.instance_3761 = new lib.シンボル1();
	this.instance_3761.setTransform(474.5,66.75);

	this.instance_3762 = new lib.シンボル1();
	this.instance_3762.setTransform(445.5,33.55);

	this.instance_3763 = new lib.シンボル1();
	this.instance_3763.setTransform(427,20.05);

	this.instance_3764 = new lib.シンボル1();
	this.instance_3764.setTransform(380,80.25);

	this.instance_3765 = new lib.シンボル1();
	this.instance_3765.setTransform(518.5,80.25);

	this.instance_3766 = new lib.シンボル1();
	this.instance_3766.setTransform(332.5,33.55);

	this.instance_3767 = new lib.シンボル1();
	this.instance_3767.setTransform(314,20.05);

	this.instance_3768 = new lib.シンボル1();
	this.instance_3768.setTransform(513.5,58.75);

	this.instance_3769 = new lib.シンボル1();
	this.instance_3769.setTransform(495,45.25);

	this.instance_3770 = new lib.シンボル1();
	this.instance_3770.setTransform(309,-1.45);

	this.instance_3771 = new lib.シンボル1();
	this.instance_3771.setTransform(290.5,-14.95);

	this.instance_3772 = new lib.シンボル1();
	this.instance_3772.setTransform(400.5,58.75);

	this.instance_3773 = new lib.シンボル1();
	this.instance_3773.setTransform(382,45.25);

	this.instance_3774 = new lib.シンボル1();
	this.instance_3774.setTransform(196,-1.45);

	this.instance_3775 = new lib.シンボル1();
	this.instance_3775.setTransform(177.5,-14.95);

	this.instance_3776 = new lib.シンボル1();
	this.instance_3776.setTransform(486.5,87.05);

	this.instance_3777 = new lib.シンボル1();
	this.instance_3777.setTransform(468,73.55);

	this.instance_3778 = new lib.シンボル1();
	this.instance_3778.setTransform(282,26.85);

	this.instance_3779 = new lib.シンボル1();
	this.instance_3779.setTransform(263.5,13.35);

	this.instance_3780 = new lib.シンボル1();
	this.instance_3780.setTransform(373.5,87.05);

	this.instance_3781 = new lib.シンボル1();
	this.instance_3781.setTransform(355,73.55);

	this.instance_3782 = new lib.シンボル1();
	this.instance_3782.setTransform(169,26.85);

	this.instance_3783 = new lib.シンボル1();
	this.instance_3783.setTransform(150.5,13.35);

	this.instance_3784 = new lib.シンボル1();
	this.instance_3784.setTransform(350,52.05);

	this.instance_3785 = new lib.シンボル1();
	this.instance_3785.setTransform(331.5,38.55);

	this.instance_3786 = new lib.シンボル1();
	this.instance_3786.setTransform(145.5,-8.15);

	this.instance_3787 = new lib.シンボル1();
	this.instance_3787.setTransform(127,-21.65);

	this.instance_3788 = new lib.シンボル1();
	this.instance_3788.setTransform(237,52.05);

	this.instance_3789 = new lib.シンボル1();
	this.instance_3789.setTransform(218.5,38.55);

	this.instance_3790 = new lib.シンボル1();
	this.instance_3790.setTransform(32.5,-8.15);

	this.instance_3791 = new lib.シンボル1();
	this.instance_3791.setTransform(14,-21.65);

	this.instance_3792 = new lib.シンボル1();
	this.instance_3792.setTransform(449.5,147.25);

	this.instance_3793 = new lib.シンボル1();
	this.instance_3793.setTransform(431,133.75);

	this.instance_3794 = new lib.シンボル1();
	this.instance_3794.setTransform(245,87.05);

	this.instance_3795 = new lib.シンボル1();
	this.instance_3795.setTransform(226.5,73.55);

	this.instance_3796 = new lib.シンボル1();
	this.instance_3796.setTransform(336.5,147.25);

	this.instance_3797 = new lib.シンボル1();
	this.instance_3797.setTransform(318,133.75);

	this.instance_3798 = new lib.シンボル1();
	this.instance_3798.setTransform(132,87.05);

	this.instance_3799 = new lib.シンボル1();
	this.instance_3799.setTransform(113.5,73.55);

	this.instance_3800 = new lib.シンボル1();
	this.instance_3800.setTransform(313,112.25);

	this.instance_3801 = new lib.シンボル1();
	this.instance_3801.setTransform(294.5,98.75);

	this.instance_3802 = new lib.シンボル1();
	this.instance_3802.setTransform(108.5,52.05);

	this.instance_3803 = new lib.シンボル1();
	this.instance_3803.setTransform(90,38.55);

	this.instance_3804 = new lib.シンボル1();
	this.instance_3804.setTransform(200,112.25);

	this.instance_3805 = new lib.シンボル1();
	this.instance_3805.setTransform(181.5,98.75);

	this.instance_3806 = new lib.シンボル1();
	this.instance_3806.setTransform(21.5,90.55,1,1,0,0,180);

	this.instance_3807 = new lib.シンボル1();
	this.instance_3807.setTransform(40,77.05,1,1,0,0,180);

	this.instance_3808 = new lib.シンボル1();
	this.instance_3808.setTransform(434.5,33.55);

	this.instance_3809 = new lib.シンボル1();
	this.instance_3809.setTransform(416,20.05);

	this.instance_3810 = new lib.シンボル1();
	this.instance_3810.setTransform(387,-13.15);

	this.instance_3811 = new lib.シンボル1();
	this.instance_3811.setTransform(368.5,-26.65);

	this.instance_3812 = new lib.シンボル1();
	this.instance_3812.setTransform(478.5,47.05);

	this.instance_3813 = new lib.シンボル1();
	this.instance_3813.setTransform(460,33.55);

	this.instance_3814 = new lib.シンボル1();
	this.instance_3814.setTransform(274,-13.15);

	this.instance_3815 = new lib.シンボル1();
	this.instance_3815.setTransform(255.5,-26.65);

	this.instance_3816 = new lib.シンボル1();
	this.instance_3816.setTransform(455,12.05);

	this.instance_3817 = new lib.シンボル1();
	this.instance_3817.setTransform(436.5,-1.45);

	this.instance_3818 = new lib.シンボル1();
	this.instance_3818.setTransform(250.5,-48.15);

	this.instance_3819 = new lib.シンボル1();
	this.instance_3819.setTransform(232,-61.65);

	this.instance_3820 = new lib.シンボル1();
	this.instance_3820.setTransform(342,12.05);

	this.instance_3821 = new lib.シンボル1();
	this.instance_3821.setTransform(323.5,-1.45);

	this.instance_3822 = new lib.シンボル1();
	this.instance_3822.setTransform(137.5,-48.15);

	this.instance_3823 = new lib.シンボル1();
	this.instance_3823.setTransform(119,-61.65);

	this.instance_3824 = new lib.シンボル1();
	this.instance_3824.setTransform(397.5,93.75);

	this.instance_3825 = new lib.シンボル1();
	this.instance_3825.setTransform(379,80.25);

	this.instance_3826 = new lib.シンボル1();
	this.instance_3826.setTransform(350,47.05);

	this.instance_3827 = new lib.シンボル1();
	this.instance_3827.setTransform(331.5,33.55);

	this.instance_3828 = new lib.シンボル1();
	this.instance_3828.setTransform(441.5,107.25);

	this.instance_3829 = new lib.シンボル1();
	this.instance_3829.setTransform(423,93.75);

	this.instance_3830 = new lib.シンボル1();
	this.instance_3830.setTransform(237,47.05);

	this.instance_3831 = new lib.シンボル1();
	this.instance_3831.setTransform(218.5,33.55);

	this.instance_3832 = new lib.シンボル1();
	this.instance_3832.setTransform(418,72.25);

	this.instance_3833 = new lib.シンボル1();
	this.instance_3833.setTransform(399.5,58.75);

	this.instance_3834 = new lib.シンボル1();
	this.instance_3834.setTransform(213.5,12.05);

	this.instance_3835 = new lib.シンボル1();
	this.instance_3835.setTransform(195,-1.45);

	this.instance_3836 = new lib.シンボル1();
	this.instance_3836.setTransform(305,72.25);

	this.instance_3837 = new lib.シンボル1();
	this.instance_3837.setTransform(286.5,58.75);

	this.instance_3838 = new lib.シンボル1();
	this.instance_3838.setTransform(100.5,12.05);

	this.instance_3839 = new lib.シンボル1();
	this.instance_3839.setTransform(82,-1.45);

	this.instance_3840 = new lib.シンボル1();
	this.instance_3840.setTransform(424,110.05);

	this.instance_3841 = new lib.シンボル1();
	this.instance_3841.setTransform(405.5,96.55);

	this.instance_3842 = new lib.シンボル1();
	this.instance_3842.setTransform(219.5,49.85);

	this.instance_3843 = new lib.シンボル1();
	this.instance_3843.setTransform(201,36.35);

	this.instance_3844 = new lib.シンボル1();
	this.instance_3844.setTransform(311,110.05);

	this.instance_3845 = new lib.シンボル1();
	this.instance_3845.setTransform(292.5,96.55);

	this.instance_3846 = new lib.シンボル1();
	this.instance_3846.setTransform(106.5,49.85);

	this.instance_3847 = new lib.シンボル1();
	this.instance_3847.setTransform(88,36.35);

	this.instance_3848 = new lib.シンボル1();
	this.instance_3848.setTransform(287.5,75.05);

	this.instance_3849 = new lib.シンボル1();
	this.instance_3849.setTransform(269,61.55);

	this.instance_3850 = new lib.シンボル1();
	this.instance_3850.setTransform(83,14.85);

	this.instance_3851 = new lib.シンボル1();
	this.instance_3851.setTransform(64.5,1.35);

	this.instance_3852 = new lib.シンボル1();
	this.instance_3852.setTransform(174.5,75.05);

	this.instance_3853 = new lib.シンボル1();
	this.instance_3853.setTransform(156,61.55);

	this.instance_3854 = new lib.シンボル1();
	this.instance_3854.setTransform(47,53.35,1,1,0,0,180);

	this.instance_3855 = new lib.シンボル1();
	this.instance_3855.setTransform(65.5,39.85,1,1,0,0,180);

	this.instance_3856 = new lib.シンボル1();
	this.instance_3856.setTransform(387,170.25);

	this.instance_3857 = new lib.シンボル1();
	this.instance_3857.setTransform(368.5,156.75);

	this.instance_3858 = new lib.シンボル1();
	this.instance_3858.setTransform(182.5,110.05);

	this.instance_3859 = new lib.シンボル1();
	this.instance_3859.setTransform(164,96.55);

	this.instance_3860 = new lib.シンボル1();
	this.instance_3860.setTransform(274,170.25);

	this.instance_3861 = new lib.シンボル1();
	this.instance_3861.setTransform(255.5,156.75);

	this.instance_3862 = new lib.シンボル1();
	this.instance_3862.setTransform(69.5,110.05);

	this.instance_3863 = new lib.シンボル1();
	this.instance_3863.setTransform(51,96.55);

	this.instance_3864 = new lib.シンボル1();
	this.instance_3864.setTransform(250.5,135.25);

	this.instance_3865 = new lib.シンボル1();
	this.instance_3865.setTransform(232,121.75);

	this.instance_3866 = new lib.シンボル1();
	this.instance_3866.setTransform(46,75.05);

	this.instance_3867 = new lib.シンボル1();
	this.instance_3867.setTransform(27.5,61.55);

	this.instance_3868 = new lib.シンボル1();
	this.instance_3868.setTransform(137.5,135.25);

	this.instance_3869 = new lib.シンボル1();
	this.instance_3869.setTransform(119,121.75);

	this.instance_3870 = new lib.シンボル1();
	this.instance_3870.setTransform(84,113.55,1,1,0,0,180);

	this.instance_3871 = new lib.シンボル1();
	this.instance_3871.setTransform(102.5,100.05,1,1,0,0,180);

	this.instance_3872 = new lib.シンボル1();
	this.instance_3872.setTransform(372,56.55);

	this.instance_3873 = new lib.シンボル1();
	this.instance_3873.setTransform(510.5,56.55);

	this.instance_3874 = new lib.シンボル1();
	this.instance_3874.setTransform(324.5,9.85);

	this.instance_3875 = new lib.シンボル1();
	this.instance_3875.setTransform(306,-3.65);

	this.instance_3876 = new lib.シンボル1();
	this.instance_3876.setTransform(416,70.05);

	this.instance_3877 = new lib.シンボル1();
	this.instance_3877.setTransform(397.5,56.55);

	this.instance_3878 = new lib.シンボル1();
	this.instance_3878.setTransform(211.5,9.85);

	this.instance_3879 = new lib.シンボル1();
	this.instance_3879.setTransform(193,-3.65);

	this.instance_3880 = new lib.シンボル1();
	this.instance_3880.setTransform(392.5,35.05);

	this.instance_3881 = new lib.シンボル1();
	this.instance_3881.setTransform(374,21.55);

	this.instance_3882 = new lib.シンボル1();
	this.instance_3882.setTransform(188,-25.15);

	this.instance_3883 = new lib.シンボル1();
	this.instance_3883.setTransform(169.5,-38.65);

	this.instance_3884 = new lib.シンボル1();
	this.instance_3884.setTransform(279.5,35.05);

	this.instance_3885 = new lib.シンボル1();
	this.instance_3885.setTransform(261,21.55);

	this.instance_3886 = new lib.シンボル1();
	this.instance_3886.setTransform(75,-25.15);

	this.instance_3887 = new lib.シンボル1();
	this.instance_3887.setTransform(56.5,-38.65);

	this.instance_3888 = new lib.シンボル1();
	this.instance_3888.setTransform(492,130.25);

	this.instance_3889 = new lib.シンボル1();
	this.instance_3889.setTransform(473.5,116.75);

	this.instance_3890 = new lib.シンボル1();
	this.instance_3890.setTransform(287.5,70.05);

	this.instance_3891 = new lib.シンボル1();
	this.instance_3891.setTransform(269,56.55);

	this.instance_3892 = new lib.シンボル1();
	this.instance_3892.setTransform(379,130.25);

	this.instance_3893 = new lib.シンボル1();
	this.instance_3893.setTransform(360.5,116.75);

	this.instance_3894 = new lib.シンボル1();
	this.instance_3894.setTransform(174.5,70.05);

	this.instance_3895 = new lib.シンボル1();
	this.instance_3895.setTransform(156,56.55);

	this.instance_3896 = new lib.シンボル1();
	this.instance_3896.setTransform(355.5,95.25);

	this.instance_3897 = new lib.シンボル1();
	this.instance_3897.setTransform(337,81.75);

	this.instance_3898 = new lib.シンボル1();
	this.instance_3898.setTransform(151,35.05);

	this.instance_3899 = new lib.シンボル1();
	this.instance_3899.setTransform(132.5,21.55);

	this.instance_3900 = new lib.シンボル1();
	this.instance_3900.setTransform(242.5,95.25);

	this.instance_3901 = new lib.シンボル1();
	this.instance_3901.setTransform(224,81.75);

	this.instance_3902 = new lib.シンボル1();
	this.instance_3902.setTransform(38,35.05);

	this.instance_3903 = new lib.シンボル1();
	this.instance_3903.setTransform(19.5,21.55);

	this.instance_3904 = new lib.シンボル1();
	this.instance_3904.setTransform(328.5,123.55);

	this.instance_3905 = new lib.シンボル1();
	this.instance_3905.setTransform(310,110.05);

	this.instance_3906 = new lib.シンボル1();
	this.instance_3906.setTransform(124,63.35);

	this.instance_3907 = new lib.シンボル1();
	this.instance_3907.setTransform(105.5,49.85);

	this.instance_3908 = new lib.シンボル1();
	this.instance_3908.setTransform(215.5,123.55);

	this.instance_3909 = new lib.シンボル1();
	this.instance_3909.setTransform(197,110.05);

	this.instance_3910 = new lib.シンボル1();
	this.instance_3910.setTransform(11,63.35);

	this.instance_3911 = new lib.シンボル1();
	this.instance_3911.setTransform(24.5,88.35,1,1,0,0,180);

	this.instance_3912 = new lib.シンボル1();
	this.instance_3912.setTransform(192,88.55);

	this.instance_3913 = new lib.シンボル1();
	this.instance_3913.setTransform(173.5,75.05);

	this.instance_3914 = new lib.シンボル1();
	this.instance_3914.setTransform(29.5,66.85,1,1,0,0,180);

	this.instance_3915 = new lib.シンボル1();
	this.instance_3915.setTransform(48,53.35,1,1,0,0,180);

	this.instance_3916 = new lib.シンボル1();
	this.instance_3916.setTransform(79,88.55);

	this.instance_3917 = new lib.シンボル1();
	this.instance_3917.setTransform(60.5,75.05);

	this.instance_3918 = new lib.シンボル1();
	this.instance_3918.setTransform(142.5,66.85,1,1,0,0,180);

	this.instance_3919 = new lib.シンボル1();
	this.instance_3919.setTransform(161,53.35,1,1,0,0,180);

	this.instance_3920 = new lib.シンボル1();
	this.instance_3920.setTransform(291.5,183.75);

	this.instance_3921 = new lib.シンボル1();
	this.instance_3921.setTransform(273,170.25);

	this.instance_3922 = new lib.シンボル1();
	this.instance_3922.setTransform(87,123.55);

	this.instance_3923 = new lib.シンボル1();
	this.instance_3923.setTransform(68.5,110.05);

	this.instance_3924 = new lib.シンボル1();
	this.instance_3924.setTransform(178.5,183.75);

	this.instance_3925 = new lib.シンボル1();
	this.instance_3925.setTransform(160,170.25);

	this.instance_3926 = new lib.シンボル1();
	this.instance_3926.setTransform(43,162.05,1,1,0,0,180);

	this.instance_3927 = new lib.シンボル1();
	this.instance_3927.setTransform(61.5,148.55,1,1,0,0,180);

	this.instance_3928 = new lib.シンボル1();
	this.instance_3928.setTransform(155,148.75);

	this.instance_3929 = new lib.シンボル1();
	this.instance_3929.setTransform(136.5,135.25);

	this.instance_3930 = new lib.シンボル1();
	this.instance_3930.setTransform(66.5,127.05,1,1,0,0,180);

	this.instance_3931 = new lib.シンボル1();
	this.instance_3931.setTransform(85,113.55,1,1,0,0,180);

	this.instance_3932 = new lib.シンボル1();
	this.instance_3932.setTransform(42,148.75);

	this.instance_3933 = new lib.シンボル1();
	this.instance_3933.setTransform(23.5,135.25);

	this.instance_3934 = new lib.シンボル1();
	this.instance_3934.setTransform(179.5,127.05,1,1,0,0,180);

	this.instance_3935 = new lib.シンボル1();
	this.instance_3935.setTransform(198,113.55,1,1,0,0,180);

	this.instance_3936 = new lib.シンボル1();
	this.instance_3936.setTransform(433.5,83.55);

	this.instance_3937 = new lib.シンボル1();
	this.instance_3937.setTransform(415,70.05);

	this.instance_3938 = new lib.シンボル1();
	this.instance_3938.setTransform(229,23.35);

	this.instance_3939 = new lib.シンボル1();
	this.instance_3939.setTransform(210.5,9.85);

	this.instance_3940 = new lib.シンボル1();
	this.instance_3940.setTransform(320.5,83.55);

	this.instance_3941 = new lib.シンボル1();
	this.instance_3941.setTransform(302,70.05);

	this.instance_3942 = new lib.シンボル1();
	this.instance_3942.setTransform(116,23.35);

	this.instance_3943 = new lib.シンボル1();
	this.instance_3943.setTransform(97.5,9.85);

	this.instance_3944 = new lib.シンボル1();
	this.instance_3944.setTransform(297,48.55);

	this.instance_3945 = new lib.シンボル1();
	this.instance_3945.setTransform(278.5,35.05);

	this.instance_3946 = new lib.シンボル1();
	this.instance_3946.setTransform(92.5,-11.65);

	this.instance_3947 = new lib.シンボル1();
	this.instance_3947.setTransform(74,-25.15);

	this.instance_3948 = new lib.シンボル1();
	this.instance_3948.setTransform(184,48.55);

	this.instance_3949 = new lib.シンボル1();
	this.instance_3949.setTransform(165.5,35.05);

	this.instance_3950 = new lib.シンボル1();
	this.instance_3950.setTransform(37.5,26.85,1,1,0,0,180);

	this.instance_3951 = new lib.シンボル1();
	this.instance_3951.setTransform(56,13.35,1,1,0,0,180);

	this.instance_3952 = new lib.シンボル1();
	this.instance_3952.setTransform(396.5,143.75);

	this.instance_3953 = new lib.シンボル1();
	this.instance_3953.setTransform(378,130.25);

	this.instance_3954 = new lib.シンボル1();
	this.instance_3954.setTransform(192,83.55);

	this.instance_3955 = new lib.シンボル1();
	this.instance_3955.setTransform(173.5,70.05);

	this.instance_3956 = new lib.シンボル1();
	this.instance_3956.setTransform(283.5,143.75);

	this.instance_3957 = new lib.シンボル1();
	this.instance_3957.setTransform(265,130.25);

	this.instance_3958 = new lib.シンボル1();
	this.instance_3958.setTransform(79,83.55);

	this.instance_3959 = new lib.シンボル1();
	this.instance_3959.setTransform(60.5,70.05);

	this.instance_3960 = new lib.シンボル1();
	this.instance_3960.setTransform(260,108.75);

	this.instance_3961 = new lib.シンボル1();
	this.instance_3961.setTransform(241.5,95.25);

	this.instance_3962 = new lib.シンボル1();
	this.instance_3962.setTransform(55.5,48.55);

	this.instance_3963 = new lib.シンボル1();
	this.instance_3963.setTransform(37,35.05);

	this.instance_3964 = new lib.シンボル1();
	this.instance_3964.setTransform(147,108.75);

	this.instance_3965 = new lib.シンボル1();
	this.instance_3965.setTransform(128.5,95.25);

	this.instance_3966 = new lib.シンボル1();
	this.instance_3966.setTransform(74.5,87.05,1,1,0,0,180);

	this.instance_3967 = new lib.シンボル1();
	this.instance_3967.setTransform(93,73.55,1,1,0,0,180);

	this.instance_3968 = new lib.シンボル1();
	this.instance_3968.setTransform(512,87.05);

	this.instance_3969 = new lib.シンボル1();
	this.instance_3969.setTransform(493.5,73.55);

	this.instance_3970 = new lib.シンボル1();
	this.instance_3970.setTransform(307.5,26.85);

	this.instance_3971 = new lib.シンボル1();
	this.instance_3971.setTransform(289,13.35);

	this.instance_3972 = new lib.シンボル1();
	this.instance_3972.setTransform(399,87.05);

	this.instance_3973 = new lib.シンボル1();
	this.instance_3973.setTransform(380.5,73.55);

	this.instance_3974 = new lib.シンボル1();
	this.instance_3974.setTransform(194.5,26.85);

	this.instance_3975 = new lib.シンボル1();
	this.instance_3975.setTransform(176,13.35);

	this.instance_3976 = new lib.シンボル1();
	this.instance_3976.setTransform(375.5,52.05);

	this.instance_3977 = new lib.シンボル1();
	this.instance_3977.setTransform(357,38.55);

	this.instance_3978 = new lib.シンボル1();
	this.instance_3978.setTransform(171,-8.15);

	this.instance_3979 = new lib.シンボル1();
	this.instance_3979.setTransform(152.5,-21.65);

	this.instance_3980 = new lib.シンボル1();
	this.instance_3980.setTransform(262.5,52.05);

	this.instance_3981 = new lib.シンボル1();
	this.instance_3981.setTransform(244,38.55);

	this.instance_3982 = new lib.シンボル1();
	this.instance_3982.setTransform(58,-8.15);

	this.instance_3983 = new lib.シンボル1();
	this.instance_3983.setTransform(39.5,-21.65);

	this.instance_3984 = new lib.シンボル1();
	this.instance_3984.setTransform(475,147.25);

	this.instance_3985 = new lib.シンボル1();
	this.instance_3985.setTransform(456.5,133.75);

	this.instance_3986 = new lib.シンボル1();
	this.instance_3986.setTransform(270.5,87.05);

	this.instance_3987 = new lib.シンボル1();
	this.instance_3987.setTransform(252,73.55);

	this.instance_3988 = new lib.シンボル1();
	this.instance_3988.setTransform(362,147.25);

	this.instance_3989 = new lib.シンボル1();
	this.instance_3989.setTransform(343.5,133.75);

	this.instance_3990 = new lib.シンボル1();
	this.instance_3990.setTransform(157.5,87.05);

	this.instance_3991 = new lib.シンボル1();
	this.instance_3991.setTransform(139,73.55);

	this.instance_3992 = new lib.シンボル1();
	this.instance_3992.setTransform(338.5,112.25);

	this.instance_3993 = new lib.シンボル1();
	this.instance_3993.setTransform(320,98.75);

	this.instance_3994 = new lib.シンボル1();
	this.instance_3994.setTransform(134,52.05);

	this.instance_3995 = new lib.シンボル1();
	this.instance_3995.setTransform(115.5,38.55);

	this.instance_3996 = new lib.シンボル1();
	this.instance_3996.setTransform(225.5,112.25);

	this.instance_3997 = new lib.シンボル1();
	this.instance_3997.setTransform(207,98.75);

	this.instance_3998 = new lib.シンボル1();
	this.instance_3998.setTransform(21,52.05);

	this.instance_3999 = new lib.シンボル1();
	this.instance_3999.setTransform(14.5,77.05,1,1,0,0,180);

	this.instance_4000 = new lib.シンボル1();
	this.instance_4000.setTransform(460,33.55);

	this.instance_4001 = new lib.シンボル1();
	this.instance_4001.setTransform(441.5,20.05);

	this.instance_4002 = new lib.シンボル1();
	this.instance_4002.setTransform(412.5,-13.15);

	this.instance_4003 = new lib.シンボル1();
	this.instance_4003.setTransform(394,-26.65);

	this.instance_4004 = new lib.シンボル1();
	this.instance_4004.setTransform(504,47.05);

	this.instance_4005 = new lib.シンボル1();
	this.instance_4005.setTransform(485.5,33.55);

	this.instance_4006 = new lib.シンボル1();
	this.instance_4006.setTransform(299.5,-13.15);

	this.instance_4007 = new lib.シンボル1();
	this.instance_4007.setTransform(281,-26.65);

	this.instance_4008 = new lib.シンボル1();
	this.instance_4008.setTransform(480.5,12.05);

	this.instance_4009 = new lib.シンボル1();
	this.instance_4009.setTransform(462,-1.45);

	this.instance_4010 = new lib.シンボル1();
	this.instance_4010.setTransform(276,-48.15);

	this.instance_4011 = new lib.シンボル1();
	this.instance_4011.setTransform(257.5,-61.65);

	this.instance_4012 = new lib.シンボル1();
	this.instance_4012.setTransform(367.5,12.05);

	this.instance_4013 = new lib.シンボル1();
	this.instance_4013.setTransform(349,-1.45);

	this.instance_4014 = new lib.シンボル1();
	this.instance_4014.setTransform(163,-48.15);

	this.instance_4015 = new lib.シンボル1();
	this.instance_4015.setTransform(144.5,-61.65);

	this.instance_4016 = new lib.シンボル1();
	this.instance_4016.setTransform(423,93.75);

	this.instance_4017 = new lib.シンボル1();
	this.instance_4017.setTransform(404.5,80.25);

	this.instance_4018 = new lib.シンボル1();
	this.instance_4018.setTransform(375.5,47.05);

	this.instance_4019 = new lib.シンボル1();
	this.instance_4019.setTransform(357,33.55);

	this.instance_4020 = new lib.シンボル1();
	this.instance_4020.setTransform(467,107.25);

	this.instance_4021 = new lib.シンボル1();
	this.instance_4021.setTransform(448.5,93.75);

	this.instance_4022 = new lib.シンボル1();
	this.instance_4022.setTransform(262.5,47.05);

	this.instance_4023 = new lib.シンボル1();
	this.instance_4023.setTransform(244,33.55);

	this.instance_4024 = new lib.シンボル1();
	this.instance_4024.setTransform(443.5,72.25);

	this.instance_4025 = new lib.シンボル1();
	this.instance_4025.setTransform(425,58.75);

	this.instance_4026 = new lib.シンボル1();
	this.instance_4026.setTransform(239,12.05);

	this.instance_4027 = new lib.シンボル1();
	this.instance_4027.setTransform(220.5,-1.45);

	this.instance_4028 = new lib.シンボル1();
	this.instance_4028.setTransform(330.5,72.25);

	this.instance_4029 = new lib.シンボル1();
	this.instance_4029.setTransform(312,58.75);

	this.instance_4030 = new lib.シンボル1();
	this.instance_4030.setTransform(126,12.05);

	this.instance_4031 = new lib.シンボル1();
	this.instance_4031.setTransform(107.5,-1.45);

	this.instance_4032 = new lib.シンボル1();
	this.instance_4032.setTransform(416.5,100.55);

	this.instance_4033 = new lib.シンボル1();
	this.instance_4033.setTransform(398,87.05);

	this.instance_4034 = new lib.シンボル1();
	this.instance_4034.setTransform(212,40.35);

	this.instance_4035 = new lib.シンボル1();
	this.instance_4035.setTransform(193.5,26.85);

	this.instance_4036 = new lib.シンボル1();
	this.instance_4036.setTransform(303.5,100.55);

	this.instance_4037 = new lib.シンボル1();
	this.instance_4037.setTransform(285,87.05);

	this.instance_4038 = new lib.シンボル1();
	this.instance_4038.setTransform(99,40.35);

	this.instance_4039 = new lib.シンボル1();
	this.instance_4039.setTransform(80.5,26.85);

	this.instance_4040 = new lib.シンボル1();
	this.instance_4040.setTransform(280,65.55);

	this.instance_4041 = new lib.シンボル1();
	this.instance_4041.setTransform(261.5,52.05);

	this.instance_4042 = new lib.シンボル1();
	this.instance_4042.setTransform(75.5,5.35);

	this.instance_4043 = new lib.シンボル1();
	this.instance_4043.setTransform(57,-8.15);

	this.instance_4044 = new lib.シンボル1();
	this.instance_4044.setTransform(167,65.55);

	this.instance_4045 = new lib.シンボル1();
	this.instance_4045.setTransform(148.5,52.05);

	this.instance_4046 = new lib.シンボル1();
	this.instance_4046.setTransform(54.5,43.85,1,1,0,0,180);

	this.instance_4047 = new lib.シンボル1();
	this.instance_4047.setTransform(73,30.35,1,1,0,0,180);

	this.instance_4048 = new lib.シンボル1();
	this.instance_4048.setTransform(379.5,160.75);

	this.instance_4049 = new lib.シンボル1();
	this.instance_4049.setTransform(361,147.25);

	this.instance_4050 = new lib.シンボル1();
	this.instance_4050.setTransform(175,100.55);

	this.instance_4051 = new lib.シンボル1();
	this.instance_4051.setTransform(156.5,87.05);

	this.instance_4052 = new lib.シンボル1();
	this.instance_4052.setTransform(266.5,160.75);

	this.instance_4053 = new lib.シンボル1();
	this.instance_4053.setTransform(248,147.25);

	this.instance_4054 = new lib.シンボル1();
	this.instance_4054.setTransform(62,100.55);

	this.instance_4055 = new lib.シンボル1();
	this.instance_4055.setTransform(43.5,87.05);

	this.instance_4056 = new lib.シンボル1();
	this.instance_4056.setTransform(243,125.75);

	this.instance_4057 = new lib.シンボル1();
	this.instance_4057.setTransform(224.5,112.25);

	this.instance_4058 = new lib.シンボル1();
	this.instance_4058.setTransform(38.5,65.55);

	this.instance_4059 = new lib.シンボル1();
	this.instance_4059.setTransform(20,52.05);

	this.instance_4060 = new lib.シンボル1();
	this.instance_4060.setTransform(130,125.75);

	this.instance_4061 = new lib.シンボル1();
	this.instance_4061.setTransform(111.5,112.25);

	this.instance_4062 = new lib.シンボル1();
	this.instance_4062.setTransform(91.5,104.05,1,1,0,0,180);

	this.instance_4063 = new lib.シンボル1();
	this.instance_4063.setTransform(110,90.55,1,1,0,0,180);

	this.instance_4064 = new lib.シンボル1();
	this.instance_4064.setTransform(521.5,60.55);

	this.instance_4065 = new lib.シンボル1();
	this.instance_4065.setTransform(503,47.05);

	this.instance_4066 = new lib.シンボル1();
	this.instance_4066.setTransform(317,0.35);

	this.instance_4067 = new lib.シンボル1();
	this.instance_4067.setTransform(298.5,-13.15);

	this.instance_4068 = new lib.シンボル1();
	this.instance_4068.setTransform(408.5,60.55);

	this.instance_4069 = new lib.シンボル1();
	this.instance_4069.setTransform(390,47.05);

	this.instance_4070 = new lib.シンボル1();
	this.instance_4070.setTransform(204,0.35);

	this.instance_4071 = new lib.シンボル1();
	this.instance_4071.setTransform(185.5,-13.15);

	this.instance_4072 = new lib.シンボル1();
	this.instance_4072.setTransform(385,25.55);

	this.instance_4073 = new lib.シンボル1();
	this.instance_4073.setTransform(366.5,12.05);

	this.instance_4074 = new lib.シンボル1();
	this.instance_4074.setTransform(180.5,-34.65);

	this.instance_4075 = new lib.シンボル1();
	this.instance_4075.setTransform(162,-48.15);

	this.instance_4076 = new lib.シンボル1();
	this.instance_4076.setTransform(272,25.55);

	this.instance_4077 = new lib.シンボル1();
	this.instance_4077.setTransform(253.5,12.05);

	this.instance_4078 = new lib.シンボル1();
	this.instance_4078.setTransform(67.5,-34.65);

	this.instance_4079 = new lib.シンボル1();
	this.instance_4079.setTransform(49,-48.15);

	this.instance_4080 = new lib.シンボル1();
	this.instance_4080.setTransform(484.5,120.75);

	this.instance_4081 = new lib.シンボル1();
	this.instance_4081.setTransform(466,107.25);

	this.instance_4082 = new lib.シンボル1();
	this.instance_4082.setTransform(280,60.55);

	this.instance_4083 = new lib.シンボル1();
	this.instance_4083.setTransform(261.5,47.05);

	this.instance_4084 = new lib.シンボル1();
	this.instance_4084.setTransform(371.5,120.75);

	this.instance_4085 = new lib.シンボル1();
	this.instance_4085.setTransform(353,107.25);

	this.instance_4086 = new lib.シンボル1();
	this.instance_4086.setTransform(167,60.55);

	this.instance_4087 = new lib.シンボル1();
	this.instance_4087.setTransform(148.5,47.05);

	this.instance_4088 = new lib.シンボル1();
	this.instance_4088.setTransform(348,85.75);

	this.instance_4089 = new lib.シンボル1();
	this.instance_4089.setTransform(329.5,72.25);

	this.instance_4090 = new lib.シンボル1();
	this.instance_4090.setTransform(143.5,25.55);

	this.instance_4091 = new lib.シンボル1();
	this.instance_4091.setTransform(125,12.05);

	this.instance_4092 = new lib.シンボル1();
	this.instance_4092.setTransform(235,85.75);

	this.instance_4093 = new lib.シンボル1();
	this.instance_4093.setTransform(216.5,72.25);

	this.instance_4094 = new lib.シンボル1();
	this.instance_4094.setTransform(30.5,25.55);

	this.instance_4095 = new lib.シンボル1();
	this.instance_4095.setTransform(12,12.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4095},{t:this.instance_4094},{t:this.instance_4093},{t:this.instance_4092},{t:this.instance_4091},{t:this.instance_4090},{t:this.instance_4089},{t:this.instance_4088},{t:this.instance_4087},{t:this.instance_4086},{t:this.instance_4085},{t:this.instance_4084},{t:this.instance_4083},{t:this.instance_4082},{t:this.instance_4081},{t:this.instance_4080},{t:this.instance_4079},{t:this.instance_4078},{t:this.instance_4077},{t:this.instance_4076},{t:this.instance_4075},{t:this.instance_4074},{t:this.instance_4073},{t:this.instance_4072},{t:this.instance_4071},{t:this.instance_4070},{t:this.instance_4069},{t:this.instance_4068},{t:this.instance_4067},{t:this.instance_4066},{t:this.instance_4065},{t:this.instance_4064},{t:this.instance_4063},{t:this.instance_4062},{t:this.instance_4061},{t:this.instance_4060},{t:this.instance_4059},{t:this.instance_4058},{t:this.instance_4057},{t:this.instance_4056},{t:this.instance_4055},{t:this.instance_4054},{t:this.instance_4053},{t:this.instance_4052},{t:this.instance_4051},{t:this.instance_4050},{t:this.instance_4049},{t:this.instance_4048},{t:this.instance_4047},{t:this.instance_4046},{t:this.instance_4045},{t:this.instance_4044},{t:this.instance_4043},{t:this.instance_4042},{t:this.instance_4041},{t:this.instance_4040},{t:this.instance_4039},{t:this.instance_4038},{t:this.instance_4037},{t:this.instance_4036},{t:this.instance_4035},{t:this.instance_4034},{t:this.instance_4033},{t:this.instance_4032},{t:this.instance_4031},{t:this.instance_4030},{t:this.instance_4029},{t:this.instance_4028},{t:this.instance_4027},{t:this.instance_4026},{t:this.instance_4025},{t:this.instance_4024},{t:this.instance_4023},{t:this.instance_4022},{t:this.instance_4021},{t:this.instance_4020},{t:this.instance_4019},{t:this.instance_4018},{t:this.instance_4017},{t:this.instance_4016},{t:this.instance_4015},{t:this.instance_4014},{t:this.instance_4013},{t:this.instance_4012},{t:this.instance_4011},{t:this.instance_4010},{t:this.instance_4009},{t:this.instance_4008},{t:this.instance_4007},{t:this.instance_4006},{t:this.instance_4005},{t:this.instance_4004},{t:this.instance_4003},{t:this.instance_4002},{t:this.instance_4001},{t:this.instance_4000},{t:this.instance_3999},{t:this.instance_3998},{t:this.instance_3997},{t:this.instance_3996},{t:this.instance_3995},{t:this.instance_3994},{t:this.instance_3993},{t:this.instance_3992},{t:this.instance_3991},{t:this.instance_3990},{t:this.instance_3989},{t:this.instance_3988},{t:this.instance_3987},{t:this.instance_3986},{t:this.instance_3985},{t:this.instance_3984},{t:this.instance_3983},{t:this.instance_3982},{t:this.instance_3981},{t:this.instance_3980},{t:this.instance_3979},{t:this.instance_3978},{t:this.instance_3977},{t:this.instance_3976},{t:this.instance_3975},{t:this.instance_3974},{t:this.instance_3973},{t:this.instance_3972},{t:this.instance_3971},{t:this.instance_3970},{t:this.instance_3969},{t:this.instance_3968},{t:this.instance_3967},{t:this.instance_3966},{t:this.instance_3965},{t:this.instance_3964},{t:this.instance_3963},{t:this.instance_3962},{t:this.instance_3961},{t:this.instance_3960},{t:this.instance_3959},{t:this.instance_3958},{t:this.instance_3957},{t:this.instance_3956},{t:this.instance_3955},{t:this.instance_3954},{t:this.instance_3953},{t:this.instance_3952},{t:this.instance_3951},{t:this.instance_3950},{t:this.instance_3949},{t:this.instance_3948},{t:this.instance_3947},{t:this.instance_3946},{t:this.instance_3945},{t:this.instance_3944},{t:this.instance_3943},{t:this.instance_3942},{t:this.instance_3941},{t:this.instance_3940},{t:this.instance_3939},{t:this.instance_3938},{t:this.instance_3937},{t:this.instance_3936},{t:this.instance_3935},{t:this.instance_3934},{t:this.instance_3933},{t:this.instance_3932},{t:this.instance_3931},{t:this.instance_3930},{t:this.instance_3929},{t:this.instance_3928},{t:this.instance_3927},{t:this.instance_3926},{t:this.instance_3925},{t:this.instance_3924},{t:this.instance_3923},{t:this.instance_3922},{t:this.instance_3921},{t:this.instance_3920},{t:this.instance_3919},{t:this.instance_3918},{t:this.instance_3917},{t:this.instance_3916},{t:this.instance_3915},{t:this.instance_3914},{t:this.instance_3913},{t:this.instance_3912},{t:this.instance_3911},{t:this.instance_3910},{t:this.instance_3909},{t:this.instance_3908},{t:this.instance_3907},{t:this.instance_3906},{t:this.instance_3905},{t:this.instance_3904},{t:this.instance_3903},{t:this.instance_3902},{t:this.instance_3901},{t:this.instance_3900},{t:this.instance_3899},{t:this.instance_3898},{t:this.instance_3897},{t:this.instance_3896},{t:this.instance_3895},{t:this.instance_3894},{t:this.instance_3893},{t:this.instance_3892},{t:this.instance_3891},{t:this.instance_3890},{t:this.instance_3889},{t:this.instance_3888},{t:this.instance_3887},{t:this.instance_3886},{t:this.instance_3885},{t:this.instance_3884},{t:this.instance_3883},{t:this.instance_3882},{t:this.instance_3881},{t:this.instance_3880},{t:this.instance_3879},{t:this.instance_3878},{t:this.instance_3877},{t:this.instance_3876},{t:this.instance_3875},{t:this.instance_3874},{t:this.instance_3873},{t:this.instance_3872},{t:this.instance_3871},{t:this.instance_3870},{t:this.instance_3869},{t:this.instance_3868},{t:this.instance_3867},{t:this.instance_3866},{t:this.instance_3865},{t:this.instance_3864},{t:this.instance_3863},{t:this.instance_3862},{t:this.instance_3861},{t:this.instance_3860},{t:this.instance_3859},{t:this.instance_3858},{t:this.instance_3857},{t:this.instance_3856},{t:this.instance_3855},{t:this.instance_3854},{t:this.instance_3853},{t:this.instance_3852},{t:this.instance_3851},{t:this.instance_3850},{t:this.instance_3849},{t:this.instance_3848},{t:this.instance_3847},{t:this.instance_3846},{t:this.instance_3845},{t:this.instance_3844},{t:this.instance_3843},{t:this.instance_3842},{t:this.instance_3841},{t:this.instance_3840},{t:this.instance_3839},{t:this.instance_3838},{t:this.instance_3837},{t:this.instance_3836},{t:this.instance_3835},{t:this.instance_3834},{t:this.instance_3833},{t:this.instance_3832},{t:this.instance_3831},{t:this.instance_3830},{t:this.instance_3829},{t:this.instance_3828},{t:this.instance_3827},{t:this.instance_3826},{t:this.instance_3825},{t:this.instance_3824},{t:this.instance_3823},{t:this.instance_3822},{t:this.instance_3821},{t:this.instance_3820},{t:this.instance_3819},{t:this.instance_3818},{t:this.instance_3817},{t:this.instance_3816},{t:this.instance_3815},{t:this.instance_3814},{t:this.instance_3813},{t:this.instance_3812},{t:this.instance_3811},{t:this.instance_3810},{t:this.instance_3809},{t:this.instance_3808},{t:this.instance_3807},{t:this.instance_3806},{t:this.instance_3805},{t:this.instance_3804},{t:this.instance_3803},{t:this.instance_3802},{t:this.instance_3801},{t:this.instance_3800},{t:this.instance_3799},{t:this.instance_3798},{t:this.instance_3797},{t:this.instance_3796},{t:this.instance_3795},{t:this.instance_3794},{t:this.instance_3793},{t:this.instance_3792},{t:this.instance_3791},{t:this.instance_3790},{t:this.instance_3789},{t:this.instance_3788},{t:this.instance_3787},{t:this.instance_3786},{t:this.instance_3785},{t:this.instance_3784},{t:this.instance_3783},{t:this.instance_3782},{t:this.instance_3781},{t:this.instance_3780},{t:this.instance_3779},{t:this.instance_3778},{t:this.instance_3777},{t:this.instance_3776},{t:this.instance_3775},{t:this.instance_3774},{t:this.instance_3773},{t:this.instance_3772},{t:this.instance_3771},{t:this.instance_3770},{t:this.instance_3769},{t:this.instance_3768},{t:this.instance_3767},{t:this.instance_3766},{t:this.instance_3765},{t:this.instance_3764},{t:this.instance_3763},{t:this.instance_3762},{t:this.instance_3761},{t:this.instance_3760},{t:this.instance_3759},{t:this.instance_3758},{t:this.instance_3757},{t:this.instance_3756},{t:this.instance_3755},{t:this.instance_3754},{t:this.instance_3753},{t:this.instance_3752},{t:this.instance_3751},{t:this.instance_3750},{t:this.instance_3749},{t:this.instance_3748},{t:this.instance_3747},{t:this.instance_3746},{t:this.instance_3745},{t:this.instance_3744},{t:this.instance_3743},{t:this.instance_3742},{t:this.instance_3741},{t:this.instance_3740},{t:this.instance_3739},{t:this.instance_3738},{t:this.instance_3737},{t:this.instance_3736},{t:this.instance_3735},{t:this.instance_3734},{t:this.instance_3733},{t:this.instance_3732},{t:this.instance_3731},{t:this.instance_3730},{t:this.instance_3729},{t:this.instance_3728},{t:this.instance_3727},{t:this.instance_3726},{t:this.instance_3725},{t:this.instance_3724},{t:this.instance_3723},{t:this.instance_3722},{t:this.instance_3721},{t:this.instance_3720},{t:this.instance_3719},{t:this.instance_3718},{t:this.instance_3717},{t:this.instance_3716},{t:this.instance_3715},{t:this.instance_3714},{t:this.instance_3713},{t:this.instance_3712},{t:this.instance_3711},{t:this.instance_3710},{t:this.instance_3709},{t:this.instance_3708},{t:this.instance_3707},{t:this.instance_3706},{t:this.instance_3705},{t:this.instance_3704},{t:this.instance_3703},{t:this.instance_3702},{t:this.instance_3701},{t:this.instance_3700},{t:this.instance_3699},{t:this.instance_3698},{t:this.instance_3697},{t:this.instance_3696},{t:this.instance_3695},{t:this.instance_3694},{t:this.instance_3693},{t:this.instance_3692},{t:this.instance_3691},{t:this.instance_3690},{t:this.instance_3689},{t:this.instance_3688},{t:this.instance_3687},{t:this.instance_3686},{t:this.instance_3685},{t:this.instance_3684},{t:this.instance_3683},{t:this.instance_3682},{t:this.instance_3681},{t:this.instance_3680},{t:this.instance_3679},{t:this.instance_3678},{t:this.instance_3677},{t:this.instance_3676},{t:this.instance_3675},{t:this.instance_3674},{t:this.instance_3673},{t:this.instance_3672},{t:this.instance_3671},{t:this.instance_3670},{t:this.instance_3669},{t:this.instance_3668},{t:this.instance_3667},{t:this.instance_3666},{t:this.instance_3665},{t:this.instance_3664},{t:this.instance_3663},{t:this.instance_3662},{t:this.instance_3661},{t:this.instance_3660},{t:this.instance_3659},{t:this.instance_3658},{t:this.instance_3657},{t:this.instance_3656},{t:this.instance_3655},{t:this.instance_3654},{t:this.instance_3653},{t:this.instance_3652},{t:this.instance_3651},{t:this.instance_3650},{t:this.instance_3649},{t:this.instance_3648},{t:this.instance_3647},{t:this.instance_3646},{t:this.instance_3645},{t:this.instance_3644},{t:this.instance_3643},{t:this.instance_3642},{t:this.instance_3641},{t:this.instance_3640},{t:this.instance_3639},{t:this.instance_3638},{t:this.instance_3637},{t:this.instance_3636},{t:this.instance_3635},{t:this.instance_3634},{t:this.instance_3633},{t:this.instance_3632},{t:this.instance_3631},{t:this.instance_3630},{t:this.instance_3629},{t:this.instance_3628},{t:this.instance_3627},{t:this.instance_3626},{t:this.instance_3625},{t:this.instance_3624},{t:this.instance_3623},{t:this.instance_3622},{t:this.instance_3621},{t:this.instance_3620},{t:this.instance_3619},{t:this.instance_3618},{t:this.instance_3617},{t:this.instance_3616},{t:this.instance_3615},{t:this.instance_3614},{t:this.instance_3613},{t:this.instance_3612},{t:this.instance_3611},{t:this.instance_3610},{t:this.instance_3609},{t:this.instance_3608},{t:this.instance_3607},{t:this.instance_3606},{t:this.instance_3605},{t:this.instance_3604},{t:this.instance_3603},{t:this.instance_3602},{t:this.instance_3601},{t:this.instance_3600},{t:this.instance_3599},{t:this.instance_3598},{t:this.instance_3597},{t:this.instance_3596},{t:this.instance_3595},{t:this.instance_3594},{t:this.instance_3593},{t:this.instance_3592},{t:this.instance_3591},{t:this.instance_3590},{t:this.instance_3589},{t:this.instance_3588},{t:this.instance_3587},{t:this.instance_3586},{t:this.instance_3585},{t:this.instance_3584},{t:this.instance_3583},{t:this.instance_3582},{t:this.instance_3581},{t:this.instance_3580},{t:this.instance_3579},{t:this.instance_3578},{t:this.instance_3577},{t:this.instance_3576},{t:this.instance_3575},{t:this.instance_3574},{t:this.instance_3573},{t:this.instance_3572},{t:this.instance_3571},{t:this.instance_3570},{t:this.instance_3569},{t:this.instance_3568},{t:this.instance_3567},{t:this.instance_3566},{t:this.instance_3565},{t:this.instance_3564},{t:this.instance_3563},{t:this.instance_3562},{t:this.instance_3561},{t:this.instance_3560},{t:this.instance_3559},{t:this.instance_3558},{t:this.instance_3557},{t:this.instance_3556},{t:this.instance_3555},{t:this.instance_3554},{t:this.instance_3553},{t:this.instance_3552},{t:this.instance_3551},{t:this.instance_3550},{t:this.instance_3549},{t:this.instance_3548},{t:this.instance_3547},{t:this.instance_3546},{t:this.instance_3545},{t:this.instance_3544},{t:this.instance_3543},{t:this.instance_3542},{t:this.instance_3541},{t:this.instance_3540},{t:this.instance_3539},{t:this.instance_3538},{t:this.instance_3537},{t:this.instance_3536},{t:this.instance_3535},{t:this.instance_3534},{t:this.instance_3533},{t:this.instance_3532},{t:this.instance_3531},{t:this.instance_3530},{t:this.instance_3529},{t:this.instance_3528},{t:this.instance_3527},{t:this.instance_3526},{t:this.instance_3525},{t:this.instance_3524},{t:this.instance_3523},{t:this.instance_3522},{t:this.instance_3521},{t:this.instance_3520},{t:this.instance_3519},{t:this.instance_3518},{t:this.instance_3517},{t:this.instance_3516},{t:this.instance_3515},{t:this.instance_3514},{t:this.instance_3513},{t:this.instance_3512},{t:this.instance_3511},{t:this.instance_3510},{t:this.instance_3509},{t:this.instance_3508},{t:this.instance_3507},{t:this.instance_3506},{t:this.instance_3505},{t:this.instance_3504},{t:this.instance_3503},{t:this.instance_3502},{t:this.instance_3501},{t:this.instance_3500},{t:this.instance_3499},{t:this.instance_3498},{t:this.instance_3497},{t:this.instance_3496},{t:this.instance_3495},{t:this.instance_3494},{t:this.instance_3493},{t:this.instance_3492},{t:this.instance_3491},{t:this.instance_3490},{t:this.instance_3489},{t:this.instance_3488},{t:this.instance_3487},{t:this.instance_3486},{t:this.instance_3485},{t:this.instance_3484},{t:this.instance_3483},{t:this.instance_3482},{t:this.instance_3481},{t:this.instance_3480},{t:this.instance_3479},{t:this.instance_3478},{t:this.instance_3477},{t:this.instance_3476},{t:this.instance_3475},{t:this.instance_3474},{t:this.instance_3473},{t:this.instance_3472},{t:this.instance_3471},{t:this.instance_3470},{t:this.instance_3469},{t:this.instance_3468},{t:this.instance_3467},{t:this.instance_3466},{t:this.instance_3465},{t:this.instance_3464},{t:this.instance_3463},{t:this.instance_3462},{t:this.instance_3461},{t:this.instance_3460},{t:this.instance_3459},{t:this.instance_3458},{t:this.instance_3457},{t:this.instance_3456},{t:this.instance_3455},{t:this.instance_3454},{t:this.instance_3453},{t:this.instance_3452},{t:this.instance_3451},{t:this.instance_3450},{t:this.instance_3449},{t:this.instance_3448},{t:this.instance_3447},{t:this.instance_3446},{t:this.instance_3445},{t:this.instance_3444},{t:this.instance_3443},{t:this.instance_3442},{t:this.instance_3441},{t:this.instance_3440},{t:this.instance_3439},{t:this.instance_3438},{t:this.instance_3437},{t:this.instance_3436},{t:this.instance_3435},{t:this.instance_3434},{t:this.instance_3433},{t:this.instance_3432},{t:this.instance_3431},{t:this.instance_3430},{t:this.instance_3429},{t:this.instance_3428},{t:this.instance_3427},{t:this.instance_3426},{t:this.instance_3425},{t:this.instance_3424},{t:this.instance_3423},{t:this.instance_3422},{t:this.instance_3421},{t:this.instance_3420},{t:this.instance_3419},{t:this.instance_3418},{t:this.instance_3417},{t:this.instance_3416},{t:this.instance_3415},{t:this.instance_3414},{t:this.instance_3413},{t:this.instance_3412},{t:this.instance_3411},{t:this.instance_3410},{t:this.instance_3409},{t:this.instance_3408},{t:this.instance_3407},{t:this.instance_3406},{t:this.instance_3405},{t:this.instance_3404},{t:this.instance_3403},{t:this.instance_3402},{t:this.instance_3401},{t:this.instance_3400},{t:this.instance_3399},{t:this.instance_3398},{t:this.instance_3397},{t:this.instance_3396},{t:this.instance_3395},{t:this.instance_3394},{t:this.instance_3393},{t:this.instance_3392},{t:this.instance_3391},{t:this.instance_3390},{t:this.instance_3389},{t:this.instance_3388},{t:this.instance_3387},{t:this.instance_3386},{t:this.instance_3385},{t:this.instance_3384},{t:this.instance_3383},{t:this.instance_3382},{t:this.instance_3381},{t:this.instance_3380},{t:this.instance_3379},{t:this.instance_3378},{t:this.instance_3377},{t:this.instance_3376},{t:this.instance_3375},{t:this.instance_3374},{t:this.instance_3373},{t:this.instance_3372},{t:this.instance_3371},{t:this.instance_3370},{t:this.instance_3369},{t:this.instance_3368},{t:this.instance_3367},{t:this.instance_3366},{t:this.instance_3365},{t:this.instance_3364},{t:this.instance_3363},{t:this.instance_3362},{t:this.instance_3361},{t:this.instance_3360},{t:this.instance_3359},{t:this.instance_3358},{t:this.instance_3357},{t:this.instance_3356},{t:this.instance_3355},{t:this.instance_3354},{t:this.instance_3353},{t:this.instance_3352},{t:this.instance_3351},{t:this.instance_3350},{t:this.instance_3349},{t:this.instance_3348},{t:this.instance_3347},{t:this.instance_3346},{t:this.instance_3345},{t:this.instance_3344},{t:this.instance_3343},{t:this.instance_3342},{t:this.instance_3341},{t:this.instance_3340},{t:this.instance_3339},{t:this.instance_3338},{t:this.instance_3337},{t:this.instance_3336},{t:this.instance_3335},{t:this.instance_3334},{t:this.instance_3333},{t:this.instance_3332},{t:this.instance_3331},{t:this.instance_3330},{t:this.instance_3329},{t:this.instance_3328},{t:this.instance_3327},{t:this.instance_3326},{t:this.instance_3325},{t:this.instance_3324},{t:this.instance_3323},{t:this.instance_3322},{t:this.instance_3321},{t:this.instance_3320},{t:this.instance_3319},{t:this.instance_3318},{t:this.instance_3317},{t:this.instance_3316},{t:this.instance_3315},{t:this.instance_3314},{t:this.instance_3313},{t:this.instance_3312},{t:this.instance_3311},{t:this.instance_3310},{t:this.instance_3309},{t:this.instance_3308},{t:this.instance_3307},{t:this.instance_3306},{t:this.instance_3305},{t:this.instance_3304},{t:this.instance_3303},{t:this.instance_3302},{t:this.instance_3301},{t:this.instance_3300},{t:this.instance_3299},{t:this.instance_3298},{t:this.instance_3297},{t:this.instance_3296},{t:this.instance_3295},{t:this.instance_3294},{t:this.instance_3293},{t:this.instance_3292},{t:this.instance_3291},{t:this.instance_3290},{t:this.instance_3289},{t:this.instance_3288},{t:this.instance_3287},{t:this.instance_3286},{t:this.instance_3285},{t:this.instance_3284},{t:this.instance_3283},{t:this.instance_3282},{t:this.instance_3281},{t:this.instance_3280},{t:this.instance_3279},{t:this.instance_3278},{t:this.instance_3277},{t:this.instance_3276},{t:this.instance_3275},{t:this.instance_3274},{t:this.instance_3273},{t:this.instance_3272},{t:this.instance_3271},{t:this.instance_3270},{t:this.instance_3269},{t:this.instance_3268},{t:this.instance_3267},{t:this.instance_3266},{t:this.instance_3265},{t:this.instance_3264},{t:this.instance_3263},{t:this.instance_3262},{t:this.instance_3261},{t:this.instance_3260},{t:this.instance_3259},{t:this.instance_3258},{t:this.instance_3257},{t:this.instance_3256},{t:this.instance_3255},{t:this.instance_3254},{t:this.instance_3253},{t:this.instance_3252},{t:this.instance_3251},{t:this.instance_3250},{t:this.instance_3249},{t:this.instance_3248},{t:this.instance_3247},{t:this.instance_3246},{t:this.instance_3245},{t:this.instance_3244},{t:this.instance_3243},{t:this.instance_3242},{t:this.instance_3241},{t:this.instance_3240},{t:this.instance_3239},{t:this.instance_3238},{t:this.instance_3237},{t:this.instance_3236},{t:this.instance_3235},{t:this.instance_3234},{t:this.instance_3233},{t:this.instance_3232},{t:this.instance_3231},{t:this.instance_3230},{t:this.instance_3229},{t:this.instance_3228},{t:this.instance_3227},{t:this.instance_3226},{t:this.instance_3225},{t:this.instance_3224},{t:this.instance_3223},{t:this.instance_3222},{t:this.instance_3221},{t:this.instance_3220},{t:this.instance_3219},{t:this.instance_3218},{t:this.instance_3217},{t:this.instance_3216},{t:this.instance_3215},{t:this.instance_3214},{t:this.instance_3213},{t:this.instance_3212},{t:this.instance_3211},{t:this.instance_3210},{t:this.instance_3209},{t:this.instance_3208},{t:this.instance_3207},{t:this.instance_3206},{t:this.instance_3205},{t:this.instance_3204},{t:this.instance_3203},{t:this.instance_3202},{t:this.instance_3201},{t:this.instance_3200},{t:this.instance_3199},{t:this.instance_3198},{t:this.instance_3197},{t:this.instance_3196},{t:this.instance_3195},{t:this.instance_3194},{t:this.instance_3193},{t:this.instance_3192},{t:this.instance_3191},{t:this.instance_3190},{t:this.instance_3189},{t:this.instance_3188},{t:this.instance_3187},{t:this.instance_3186},{t:this.instance_3185},{t:this.instance_3184},{t:this.instance_3183},{t:this.instance_3182},{t:this.instance_3181},{t:this.instance_3180},{t:this.instance_3179},{t:this.instance_3178},{t:this.instance_3177},{t:this.instance_3176},{t:this.instance_3175},{t:this.instance_3174},{t:this.instance_3173},{t:this.instance_3172},{t:this.instance_3171},{t:this.instance_3170},{t:this.instance_3169},{t:this.instance_3168},{t:this.instance_3167},{t:this.instance_3166},{t:this.instance_3165},{t:this.instance_3164},{t:this.instance_3163},{t:this.instance_3162},{t:this.instance_3161},{t:this.instance_3160},{t:this.instance_3159},{t:this.instance_3158},{t:this.instance_3157},{t:this.instance_3156},{t:this.instance_3155},{t:this.instance_3154},{t:this.instance_3153},{t:this.instance_3152},{t:this.instance_3151},{t:this.instance_3150},{t:this.instance_3149},{t:this.instance_3148},{t:this.instance_3147},{t:this.instance_3146},{t:this.instance_3145},{t:this.instance_3144},{t:this.instance_3143},{t:this.instance_3142},{t:this.instance_3141},{t:this.instance_3140},{t:this.instance_3139},{t:this.instance_3138},{t:this.instance_3137},{t:this.instance_3136},{t:this.instance_3135},{t:this.instance_3134},{t:this.instance_3133},{t:this.instance_3132},{t:this.instance_3131},{t:this.instance_3130},{t:this.instance_3129},{t:this.instance_3128},{t:this.instance_3127},{t:this.instance_3126},{t:this.instance_3125},{t:this.instance_3124},{t:this.instance_3123},{t:this.instance_3122},{t:this.instance_3121},{t:this.instance_3120},{t:this.instance_3119},{t:this.instance_3118},{t:this.instance_3117},{t:this.instance_3116},{t:this.instance_3115},{t:this.instance_3114},{t:this.instance_3113},{t:this.instance_3112},{t:this.instance_3111},{t:this.instance_3110},{t:this.instance_3109},{t:this.instance_3108},{t:this.instance_3107},{t:this.instance_3106},{t:this.instance_3105},{t:this.instance_3104},{t:this.instance_3103},{t:this.instance_3102},{t:this.instance_3101},{t:this.instance_3100},{t:this.instance_3099},{t:this.instance_3098},{t:this.instance_3097},{t:this.instance_3096},{t:this.instance_3095},{t:this.instance_3094},{t:this.instance_3093},{t:this.instance_3092},{t:this.instance_3091},{t:this.instance_3090},{t:this.instance_3089},{t:this.instance_3088},{t:this.instance_3087},{t:this.instance_3086},{t:this.instance_3085},{t:this.instance_3084},{t:this.instance_3083},{t:this.instance_3082},{t:this.instance_3081},{t:this.instance_3080},{t:this.instance_3079},{t:this.instance_3078},{t:this.instance_3077},{t:this.instance_3076},{t:this.instance_3075},{t:this.instance_3074},{t:this.instance_3073},{t:this.instance_3072},{t:this.instance_3071},{t:this.instance_3070},{t:this.instance_3069},{t:this.instance_3068},{t:this.instance_3067},{t:this.instance_3066},{t:this.instance_3065},{t:this.instance_3064},{t:this.instance_3063},{t:this.instance_3062},{t:this.instance_3061},{t:this.instance_3060},{t:this.instance_3059},{t:this.instance_3058},{t:this.instance_3057},{t:this.instance_3056},{t:this.instance_3055},{t:this.instance_3054},{t:this.instance_3053},{t:this.instance_3052},{t:this.instance_3051},{t:this.instance_3050},{t:this.instance_3049},{t:this.instance_3048},{t:this.instance_3047},{t:this.instance_3046},{t:this.instance_3045},{t:this.instance_3044},{t:this.instance_3043},{t:this.instance_3042},{t:this.instance_3041},{t:this.instance_3040},{t:this.instance_3039},{t:this.instance_3038},{t:this.instance_3037},{t:this.instance_3036},{t:this.instance_3035},{t:this.instance_3034},{t:this.instance_3033},{t:this.instance_3032},{t:this.instance_3031},{t:this.instance_3030},{t:this.instance_3029},{t:this.instance_3028},{t:this.instance_3027},{t:this.instance_3026},{t:this.instance_3025},{t:this.instance_3024},{t:this.instance_3023},{t:this.instance_3022},{t:this.instance_3021},{t:this.instance_3020},{t:this.instance_3019},{t:this.instance_3018},{t:this.instance_3017},{t:this.instance_3016},{t:this.instance_3015},{t:this.instance_3014},{t:this.instance_3013},{t:this.instance_3012},{t:this.instance_3011},{t:this.instance_3010},{t:this.instance_3009},{t:this.instance_3008},{t:this.instance_3007},{t:this.instance_3006},{t:this.instance_3005},{t:this.instance_3004},{t:this.instance_3003},{t:this.instance_3002},{t:this.instance_3001},{t:this.instance_3000},{t:this.instance_2999},{t:this.instance_2998},{t:this.instance_2997},{t:this.instance_2996},{t:this.instance_2995},{t:this.instance_2994},{t:this.instance_2993},{t:this.instance_2992},{t:this.instance_2991},{t:this.instance_2990},{t:this.instance_2989},{t:this.instance_2988},{t:this.instance_2987},{t:this.instance_2986},{t:this.instance_2985},{t:this.instance_2984},{t:this.instance_2983},{t:this.instance_2982},{t:this.instance_2981},{t:this.instance_2980},{t:this.instance_2979},{t:this.instance_2978},{t:this.instance_2977},{t:this.instance_2976},{t:this.instance_2975},{t:this.instance_2974},{t:this.instance_2973},{t:this.instance_2972},{t:this.instance_2971},{t:this.instance_2970},{t:this.instance_2969},{t:this.instance_2968},{t:this.instance_2967},{t:this.instance_2966},{t:this.instance_2965},{t:this.instance_2964},{t:this.instance_2963},{t:this.instance_2962},{t:this.instance_2961},{t:this.instance_2960},{t:this.instance_2959},{t:this.instance_2958},{t:this.instance_2957},{t:this.instance_2956},{t:this.instance_2955},{t:this.instance_2954},{t:this.instance_2953},{t:this.instance_2952},{t:this.instance_2951},{t:this.instance_2950},{t:this.instance_2949},{t:this.instance_2948},{t:this.instance_2947},{t:this.instance_2946},{t:this.instance_2945},{t:this.instance_2944},{t:this.instance_2943},{t:this.instance_2942},{t:this.instance_2941},{t:this.instance_2940},{t:this.instance_2939},{t:this.instance_2938},{t:this.instance_2937},{t:this.instance_2936},{t:this.instance_2935},{t:this.instance_2934},{t:this.instance_2933},{t:this.instance_2932},{t:this.instance_2931},{t:this.instance_2930},{t:this.instance_2929},{t:this.instance_2928},{t:this.instance_2927},{t:this.instance_2926},{t:this.instance_2925},{t:this.instance_2924},{t:this.instance_2923},{t:this.instance_2922},{t:this.instance_2921},{t:this.instance_2920},{t:this.instance_2919},{t:this.instance_2918},{t:this.instance_2917},{t:this.instance_2916},{t:this.instance_2915},{t:this.instance_2914},{t:this.instance_2913},{t:this.instance_2912},{t:this.instance_2911},{t:this.instance_2910},{t:this.instance_2909},{t:this.instance_2908},{t:this.instance_2907},{t:this.instance_2906},{t:this.instance_2905},{t:this.instance_2904},{t:this.instance_2903},{t:this.instance_2902},{t:this.instance_2901},{t:this.instance_2900},{t:this.instance_2899},{t:this.instance_2898},{t:this.instance_2897},{t:this.instance_2896},{t:this.instance_2895},{t:this.instance_2894},{t:this.instance_2893},{t:this.instance_2892},{t:this.instance_2891},{t:this.instance_2890},{t:this.instance_2889},{t:this.instance_2888},{t:this.instance_2887},{t:this.instance_2886},{t:this.instance_2885},{t:this.instance_2884},{t:this.instance_2883},{t:this.instance_2882},{t:this.instance_2881},{t:this.instance_2880},{t:this.instance_2879},{t:this.instance_2878},{t:this.instance_2877},{t:this.instance_2876},{t:this.instance_2875},{t:this.instance_2874},{t:this.instance_2873},{t:this.instance_2872},{t:this.instance_2871},{t:this.instance_2870},{t:this.instance_2869},{t:this.instance_2868},{t:this.instance_2867},{t:this.instance_2866},{t:this.instance_2865},{t:this.instance_2864},{t:this.instance_2863},{t:this.instance_2862},{t:this.instance_2861},{t:this.instance_2860},{t:this.instance_2859},{t:this.instance_2858},{t:this.instance_2857},{t:this.instance_2856},{t:this.instance_2855},{t:this.instance_2854},{t:this.instance_2853},{t:this.instance_2852},{t:this.instance_2851},{t:this.instance_2850},{t:this.instance_2849},{t:this.instance_2848},{t:this.instance_2847},{t:this.instance_2846},{t:this.instance_2845},{t:this.instance_2844},{t:this.instance_2843},{t:this.instance_2842},{t:this.instance_2841},{t:this.instance_2840},{t:this.instance_2839},{t:this.instance_2838},{t:this.instance_2837},{t:this.instance_2836},{t:this.instance_2835},{t:this.instance_2834},{t:this.instance_2833},{t:this.instance_2832},{t:this.instance_2831},{t:this.instance_2830},{t:this.instance_2829},{t:this.instance_2828},{t:this.instance_2827},{t:this.instance_2826},{t:this.instance_2825},{t:this.instance_2824},{t:this.instance_2823},{t:this.instance_2822},{t:this.instance_2821},{t:this.instance_2820},{t:this.instance_2819},{t:this.instance_2818},{t:this.instance_2817},{t:this.instance_2816},{t:this.instance_2815},{t:this.instance_2814},{t:this.instance_2813},{t:this.instance_2812},{t:this.instance_2811},{t:this.instance_2810},{t:this.instance_2809},{t:this.instance_2808},{t:this.instance_2807},{t:this.instance_2806},{t:this.instance_2805},{t:this.instance_2804},{t:this.instance_2803},{t:this.instance_2802},{t:this.instance_2801},{t:this.instance_2800},{t:this.instance_2799},{t:this.instance_2798},{t:this.instance_2797},{t:this.instance_2796},{t:this.instance_2795},{t:this.instance_2794},{t:this.instance_2793},{t:this.instance_2792},{t:this.instance_2791},{t:this.instance_2790},{t:this.instance_2789},{t:this.instance_2788},{t:this.instance_2787},{t:this.instance_2786},{t:this.instance_2785},{t:this.instance_2784},{t:this.instance_2783},{t:this.instance_2782},{t:this.instance_2781},{t:this.instance_2780},{t:this.instance_2779},{t:this.instance_2778},{t:this.instance_2777},{t:this.instance_2776},{t:this.instance_2775},{t:this.instance_2774},{t:this.instance_2773},{t:this.instance_2772},{t:this.instance_2771},{t:this.instance_2770},{t:this.instance_2769},{t:this.instance_2768},{t:this.instance_2767},{t:this.instance_2766},{t:this.instance_2765},{t:this.instance_2764},{t:this.instance_2763},{t:this.instance_2762},{t:this.instance_2761},{t:this.instance_2760},{t:this.instance_2759},{t:this.instance_2758},{t:this.instance_2757},{t:this.instance_2756},{t:this.instance_2755},{t:this.instance_2754},{t:this.instance_2753},{t:this.instance_2752},{t:this.instance_2751},{t:this.instance_2750},{t:this.instance_2749},{t:this.instance_2748},{t:this.instance_2747},{t:this.instance_2746},{t:this.instance_2745},{t:this.instance_2744},{t:this.instance_2743},{t:this.instance_2742},{t:this.instance_2741},{t:this.instance_2740},{t:this.instance_2739},{t:this.instance_2738},{t:this.instance_2737},{t:this.instance_2736},{t:this.instance_2735},{t:this.instance_2734},{t:this.instance_2733},{t:this.instance_2732},{t:this.instance_2731},{t:this.instance_2730},{t:this.instance_2729},{t:this.instance_2728},{t:this.instance_2727},{t:this.instance_2726},{t:this.instance_2725},{t:this.instance_2724},{t:this.instance_2723},{t:this.instance_2722},{t:this.instance_2721},{t:this.instance_2720},{t:this.instance_2719},{t:this.instance_2718},{t:this.instance_2717},{t:this.instance_2716},{t:this.instance_2715},{t:this.instance_2714},{t:this.instance_2713},{t:this.instance_2712},{t:this.instance_2711},{t:this.instance_2710},{t:this.instance_2709},{t:this.instance_2708},{t:this.instance_2707},{t:this.instance_2706},{t:this.instance_2705},{t:this.instance_2704},{t:this.instance_2703},{t:this.instance_2702},{t:this.instance_2701},{t:this.instance_2700},{t:this.instance_2699},{t:this.instance_2698},{t:this.instance_2697},{t:this.instance_2696},{t:this.instance_2695},{t:this.instance_2694},{t:this.instance_2693},{t:this.instance_2692},{t:this.instance_2691},{t:this.instance_2690},{t:this.instance_2689},{t:this.instance_2688},{t:this.instance_2687},{t:this.instance_2686},{t:this.instance_2685},{t:this.instance_2684},{t:this.instance_2683},{t:this.instance_2682},{t:this.instance_2681},{t:this.instance_2680},{t:this.instance_2679},{t:this.instance_2678},{t:this.instance_2677},{t:this.instance_2676},{t:this.instance_2675},{t:this.instance_2674},{t:this.instance_2673},{t:this.instance_2672},{t:this.instance_2671},{t:this.instance_2670},{t:this.instance_2669},{t:this.instance_2668},{t:this.instance_2667},{t:this.instance_2666},{t:this.instance_2665},{t:this.instance_2664},{t:this.instance_2663},{t:this.instance_2662},{t:this.instance_2661},{t:this.instance_2660},{t:this.instance_2659},{t:this.instance_2658},{t:this.instance_2657},{t:this.instance_2656},{t:this.instance_2655},{t:this.instance_2654},{t:this.instance_2653},{t:this.instance_2652},{t:this.instance_2651},{t:this.instance_2650},{t:this.instance_2649},{t:this.instance_2648},{t:this.instance_2647},{t:this.instance_2646},{t:this.instance_2645},{t:this.instance_2644},{t:this.instance_2643},{t:this.instance_2642},{t:this.instance_2641},{t:this.instance_2640},{t:this.instance_2639},{t:this.instance_2638},{t:this.instance_2637},{t:this.instance_2636},{t:this.instance_2635},{t:this.instance_2634},{t:this.instance_2633},{t:this.instance_2632},{t:this.instance_2631},{t:this.instance_2630},{t:this.instance_2629},{t:this.instance_2628},{t:this.instance_2627},{t:this.instance_2626},{t:this.instance_2625},{t:this.instance_2624},{t:this.instance_2623},{t:this.instance_2622},{t:this.instance_2621},{t:this.instance_2620},{t:this.instance_2619},{t:this.instance_2618},{t:this.instance_2617},{t:this.instance_2616},{t:this.instance_2615},{t:this.instance_2614},{t:this.instance_2613},{t:this.instance_2612},{t:this.instance_2611},{t:this.instance_2610},{t:this.instance_2609},{t:this.instance_2608},{t:this.instance_2607},{t:this.instance_2606},{t:this.instance_2605},{t:this.instance_2604},{t:this.instance_2603},{t:this.instance_2602},{t:this.instance_2601},{t:this.instance_2600},{t:this.instance_2599},{t:this.instance_2598},{t:this.instance_2597},{t:this.instance_2596},{t:this.instance_2595},{t:this.instance_2594},{t:this.instance_2593},{t:this.instance_2592},{t:this.instance_2591},{t:this.instance_2590},{t:this.instance_2589},{t:this.instance_2588},{t:this.instance_2587},{t:this.instance_2586},{t:this.instance_2585},{t:this.instance_2584},{t:this.instance_2583},{t:this.instance_2582},{t:this.instance_2581},{t:this.instance_2580},{t:this.instance_2579},{t:this.instance_2578},{t:this.instance_2577},{t:this.instance_2576},{t:this.instance_2575},{t:this.instance_2574},{t:this.instance_2573},{t:this.instance_2572},{t:this.instance_2571},{t:this.instance_2570},{t:this.instance_2569},{t:this.instance_2568},{t:this.instance_2567},{t:this.instance_2566},{t:this.instance_2565},{t:this.instance_2564},{t:this.instance_2563},{t:this.instance_2562},{t:this.instance_2561},{t:this.instance_2560},{t:this.instance_2559},{t:this.instance_2558},{t:this.instance_2557},{t:this.instance_2556},{t:this.instance_2555},{t:this.instance_2554},{t:this.instance_2553},{t:this.instance_2552},{t:this.instance_2551},{t:this.instance_2550},{t:this.instance_2549},{t:this.instance_2548},{t:this.instance_2547},{t:this.instance_2546},{t:this.instance_2545},{t:this.instance_2544},{t:this.instance_2543},{t:this.instance_2542},{t:this.instance_2541},{t:this.instance_2540},{t:this.instance_2539},{t:this.instance_2538},{t:this.instance_2537},{t:this.instance_2536},{t:this.instance_2535},{t:this.instance_2534},{t:this.instance_2533},{t:this.instance_2532},{t:this.instance_2531},{t:this.instance_2530},{t:this.instance_2529},{t:this.instance_2528},{t:this.instance_2527},{t:this.instance_2526},{t:this.instance_2525},{t:this.instance_2524},{t:this.instance_2523},{t:this.instance_2522},{t:this.instance_2521},{t:this.instance_2520},{t:this.instance_2519},{t:this.instance_2518},{t:this.instance_2517},{t:this.instance_2516},{t:this.instance_2515},{t:this.instance_2514},{t:this.instance_2513},{t:this.instance_2512},{t:this.instance_2511},{t:this.instance_2510},{t:this.instance_2509},{t:this.instance_2508},{t:this.instance_2507},{t:this.instance_2506},{t:this.instance_2505},{t:this.instance_2504},{t:this.instance_2503},{t:this.instance_2502},{t:this.instance_2501},{t:this.instance_2500},{t:this.instance_2499},{t:this.instance_2498},{t:this.instance_2497},{t:this.instance_2496},{t:this.instance_2495},{t:this.instance_2494},{t:this.instance_2493},{t:this.instance_2492},{t:this.instance_2491},{t:this.instance_2490},{t:this.instance_2489},{t:this.instance_2488},{t:this.instance_2487},{t:this.instance_2486},{t:this.instance_2485},{t:this.instance_2484},{t:this.instance_2483},{t:this.instance_2482},{t:this.instance_2481},{t:this.instance_2480},{t:this.instance_2479},{t:this.instance_2478},{t:this.instance_2477},{t:this.instance_2476},{t:this.instance_2475},{t:this.instance_2474},{t:this.instance_2473},{t:this.instance_2472},{t:this.instance_2471},{t:this.instance_2470},{t:this.instance_2469},{t:this.instance_2468},{t:this.instance_2467},{t:this.instance_2466},{t:this.instance_2465},{t:this.instance_2464},{t:this.instance_2463},{t:this.instance_2462},{t:this.instance_2461},{t:this.instance_2460},{t:this.instance_2459},{t:this.instance_2458},{t:this.instance_2457},{t:this.instance_2456},{t:this.instance_2455},{t:this.instance_2454},{t:this.instance_2453},{t:this.instance_2452},{t:this.instance_2451},{t:this.instance_2450},{t:this.instance_2449},{t:this.instance_2448},{t:this.instance_2447},{t:this.instance_2446},{t:this.instance_2445},{t:this.instance_2444},{t:this.instance_2443},{t:this.instance_2442},{t:this.instance_2441},{t:this.instance_2440},{t:this.instance_2439},{t:this.instance_2438},{t:this.instance_2437},{t:this.instance_2436},{t:this.instance_2435},{t:this.instance_2434},{t:this.instance_2433},{t:this.instance_2432},{t:this.instance_2431},{t:this.instance_2430},{t:this.instance_2429},{t:this.instance_2428},{t:this.instance_2427},{t:this.instance_2426},{t:this.instance_2425},{t:this.instance_2424},{t:this.instance_2423},{t:this.instance_2422},{t:this.instance_2421},{t:this.instance_2420},{t:this.instance_2419},{t:this.instance_2418},{t:this.instance_2417},{t:this.instance_2416},{t:this.instance_2415},{t:this.instance_2414},{t:this.instance_2413},{t:this.instance_2412},{t:this.instance_2411},{t:this.instance_2410},{t:this.instance_2409},{t:this.instance_2408},{t:this.instance_2407},{t:this.instance_2406},{t:this.instance_2405},{t:this.instance_2404},{t:this.instance_2403},{t:this.instance_2402},{t:this.instance_2401},{t:this.instance_2400},{t:this.instance_2399},{t:this.instance_2398},{t:this.instance_2397},{t:this.instance_2396},{t:this.instance_2395},{t:this.instance_2394},{t:this.instance_2393},{t:this.instance_2392},{t:this.instance_2391},{t:this.instance_2390},{t:this.instance_2389},{t:this.instance_2388},{t:this.instance_2387},{t:this.instance_2386},{t:this.instance_2385},{t:this.instance_2384},{t:this.instance_2383},{t:this.instance_2382},{t:this.instance_2381},{t:this.instance_2380},{t:this.instance_2379},{t:this.instance_2378},{t:this.instance_2377},{t:this.instance_2376},{t:this.instance_2375},{t:this.instance_2374},{t:this.instance_2373},{t:this.instance_2372},{t:this.instance_2371},{t:this.instance_2370},{t:this.instance_2369},{t:this.instance_2368},{t:this.instance_2367},{t:this.instance_2366},{t:this.instance_2365},{t:this.instance_2364},{t:this.instance_2363},{t:this.instance_2362},{t:this.instance_2361},{t:this.instance_2360},{t:this.instance_2359},{t:this.instance_2358},{t:this.instance_2357},{t:this.instance_2356},{t:this.instance_2355},{t:this.instance_2354},{t:this.instance_2353},{t:this.instance_2352},{t:this.instance_2351},{t:this.instance_2350},{t:this.instance_2349},{t:this.instance_2348},{t:this.instance_2347},{t:this.instance_2346},{t:this.instance_2345},{t:this.instance_2344},{t:this.instance_2343},{t:this.instance_2342},{t:this.instance_2341},{t:this.instance_2340},{t:this.instance_2339},{t:this.instance_2338},{t:this.instance_2337},{t:this.instance_2336},{t:this.instance_2335},{t:this.instance_2334},{t:this.instance_2333},{t:this.instance_2332},{t:this.instance_2331},{t:this.instance_2330},{t:this.instance_2329},{t:this.instance_2328},{t:this.instance_2327},{t:this.instance_2326},{t:this.instance_2325},{t:this.instance_2324},{t:this.instance_2323},{t:this.instance_2322},{t:this.instance_2321},{t:this.instance_2320},{t:this.instance_2319},{t:this.instance_2318},{t:this.instance_2317},{t:this.instance_2316},{t:this.instance_2315},{t:this.instance_2314},{t:this.instance_2313},{t:this.instance_2312},{t:this.instance_2311},{t:this.instance_2310},{t:this.instance_2309},{t:this.instance_2308},{t:this.instance_2307},{t:this.instance_2306},{t:this.instance_2305},{t:this.instance_2304},{t:this.instance_2303},{t:this.instance_2302},{t:this.instance_2301},{t:this.instance_2300},{t:this.instance_2299},{t:this.instance_2298},{t:this.instance_2297},{t:this.instance_2296},{t:this.instance_2295},{t:this.instance_2294},{t:this.instance_2293},{t:this.instance_2292},{t:this.instance_2291},{t:this.instance_2290},{t:this.instance_2289},{t:this.instance_2288},{t:this.instance_2287},{t:this.instance_2286},{t:this.instance_2285},{t:this.instance_2284},{t:this.instance_2283},{t:this.instance_2282},{t:this.instance_2281},{t:this.instance_2280},{t:this.instance_2279},{t:this.instance_2278},{t:this.instance_2277},{t:this.instance_2276},{t:this.instance_2275},{t:this.instance_2274},{t:this.instance_2273},{t:this.instance_2272},{t:this.instance_2271},{t:this.instance_2270},{t:this.instance_2269},{t:this.instance_2268},{t:this.instance_2267},{t:this.instance_2266},{t:this.instance_2265},{t:this.instance_2264},{t:this.instance_2263},{t:this.instance_2262},{t:this.instance_2261},{t:this.instance_2260},{t:this.instance_2259},{t:this.instance_2258},{t:this.instance_2257},{t:this.instance_2256},{t:this.instance_2255},{t:this.instance_2254},{t:this.instance_2253},{t:this.instance_2252},{t:this.instance_2251},{t:this.instance_2250},{t:this.instance_2249},{t:this.instance_2248},{t:this.instance_2247},{t:this.instance_2246},{t:this.instance_2245},{t:this.instance_2244},{t:this.instance_2243},{t:this.instance_2242},{t:this.instance_2241},{t:this.instance_2240},{t:this.instance_2239},{t:this.instance_2238},{t:this.instance_2237},{t:this.instance_2236},{t:this.instance_2235},{t:this.instance_2234},{t:this.instance_2233},{t:this.instance_2232},{t:this.instance_2231},{t:this.instance_2230},{t:this.instance_2229},{t:this.instance_2228},{t:this.instance_2227},{t:this.instance_2226},{t:this.instance_2225},{t:this.instance_2224},{t:this.instance_2223},{t:this.instance_2222},{t:this.instance_2221},{t:this.instance_2220},{t:this.instance_2219},{t:this.instance_2218},{t:this.instance_2217},{t:this.instance_2216},{t:this.instance_2215},{t:this.instance_2214},{t:this.instance_2213},{t:this.instance_2212},{t:this.instance_2211},{t:this.instance_2210},{t:this.instance_2209},{t:this.instance_2208},{t:this.instance_2207},{t:this.instance_2206},{t:this.instance_2205},{t:this.instance_2204},{t:this.instance_2203},{t:this.instance_2202},{t:this.instance_2201},{t:this.instance_2200},{t:this.instance_2199},{t:this.instance_2198},{t:this.instance_2197},{t:this.instance_2196},{t:this.instance_2195},{t:this.instance_2194},{t:this.instance_2193},{t:this.instance_2192},{t:this.instance_2191},{t:this.instance_2190},{t:this.instance_2189},{t:this.instance_2188},{t:this.instance_2187},{t:this.instance_2186},{t:this.instance_2185},{t:this.instance_2184},{t:this.instance_2183},{t:this.instance_2182},{t:this.instance_2181},{t:this.instance_2180},{t:this.instance_2179},{t:this.instance_2178},{t:this.instance_2177},{t:this.instance_2176},{t:this.instance_2175},{t:this.instance_2174},{t:this.instance_2173},{t:this.instance_2172},{t:this.instance_2171},{t:this.instance_2170},{t:this.instance_2169},{t:this.instance_2168},{t:this.instance_2167},{t:this.instance_2166},{t:this.instance_2165},{t:this.instance_2164},{t:this.instance_2163},{t:this.instance_2162},{t:this.instance_2161},{t:this.instance_2160},{t:this.instance_2159},{t:this.instance_2158},{t:this.instance_2157},{t:this.instance_2156},{t:this.instance_2155},{t:this.instance_2154},{t:this.instance_2153},{t:this.instance_2152},{t:this.instance_2151},{t:this.instance_2150},{t:this.instance_2149},{t:this.instance_2148},{t:this.instance_2147},{t:this.instance_2146},{t:this.instance_2145},{t:this.instance_2144},{t:this.instance_2143},{t:this.instance_2142},{t:this.instance_2141},{t:this.instance_2140},{t:this.instance_2139},{t:this.instance_2138},{t:this.instance_2137},{t:this.instance_2136},{t:this.instance_2135},{t:this.instance_2134},{t:this.instance_2133},{t:this.instance_2132},{t:this.instance_2131},{t:this.instance_2130},{t:this.instance_2129},{t:this.instance_2128},{t:this.instance_2127},{t:this.instance_2126},{t:this.instance_2125},{t:this.instance_2124},{t:this.instance_2123},{t:this.instance_2122},{t:this.instance_2121},{t:this.instance_2120},{t:this.instance_2119},{t:this.instance_2118},{t:this.instance_2117},{t:this.instance_2116},{t:this.instance_2115},{t:this.instance_2114},{t:this.instance_2113},{t:this.instance_2112},{t:this.instance_2111},{t:this.instance_2110},{t:this.instance_2109},{t:this.instance_2108},{t:this.instance_2107},{t:this.instance_2106},{t:this.instance_2105},{t:this.instance_2104},{t:this.instance_2103},{t:this.instance_2102},{t:this.instance_2101},{t:this.instance_2100},{t:this.instance_2099},{t:this.instance_2098},{t:this.instance_2097},{t:this.instance_2096},{t:this.instance_2095},{t:this.instance_2094},{t:this.instance_2093},{t:this.instance_2092},{t:this.instance_2091},{t:this.instance_2090},{t:this.instance_2089},{t:this.instance_2088},{t:this.instance_2087},{t:this.instance_2086},{t:this.instance_2085},{t:this.instance_2084},{t:this.instance_2083},{t:this.instance_2082},{t:this.instance_2081},{t:this.instance_2080},{t:this.instance_2079},{t:this.instance_2078},{t:this.instance_2077},{t:this.instance_2076},{t:this.instance_2075},{t:this.instance_2074},{t:this.instance_2073},{t:this.instance_2072},{t:this.instance_2071},{t:this.instance_2070},{t:this.instance_2069},{t:this.instance_2068},{t:this.instance_2067},{t:this.instance_2066},{t:this.instance_2065},{t:this.instance_2064},{t:this.instance_2063},{t:this.instance_2062},{t:this.instance_2061},{t:this.instance_2060},{t:this.instance_2059},{t:this.instance_2058},{t:this.instance_2057},{t:this.instance_2056},{t:this.instance_2055},{t:this.instance_2054},{t:this.instance_2053},{t:this.instance_2052},{t:this.instance_2051},{t:this.instance_2050},{t:this.instance_2049},{t:this.instance_2048},{t:this.instance_2047},{t:this.instance_2046},{t:this.instance_2045},{t:this.instance_2044},{t:this.instance_2043},{t:this.instance_2042},{t:this.instance_2041},{t:this.instance_2040},{t:this.instance_2039},{t:this.instance_2038},{t:this.instance_2037},{t:this.instance_2036},{t:this.instance_2035},{t:this.instance_2034},{t:this.instance_2033},{t:this.instance_2032},{t:this.instance_2031},{t:this.instance_2030},{t:this.instance_2029},{t:this.instance_2028},{t:this.instance_2027},{t:this.instance_2026},{t:this.instance_2025},{t:this.instance_2024},{t:this.instance_2023},{t:this.instance_2022},{t:this.instance_2021},{t:this.instance_2020},{t:this.instance_2019},{t:this.instance_2018},{t:this.instance_2017},{t:this.instance_2016},{t:this.instance_2015},{t:this.instance_2014},{t:this.instance_2013},{t:this.instance_2012},{t:this.instance_2011},{t:this.instance_2010},{t:this.instance_2009},{t:this.instance_2008},{t:this.instance_2007},{t:this.instance_2006},{t:this.instance_2005},{t:this.instance_2004},{t:this.instance_2003},{t:this.instance_2002},{t:this.instance_2001},{t:this.instance_2000},{t:this.instance_1999},{t:this.instance_1998},{t:this.instance_1997},{t:this.instance_1996},{t:this.instance_1995},{t:this.instance_1994},{t:this.instance_1993},{t:this.instance_1992},{t:this.instance_1991},{t:this.instance_1990},{t:this.instance_1989},{t:this.instance_1988},{t:this.instance_1987},{t:this.instance_1986},{t:this.instance_1985},{t:this.instance_1984},{t:this.instance_1983},{t:this.instance_1982},{t:this.instance_1981},{t:this.instance_1980},{t:this.instance_1979},{t:this.instance_1978},{t:this.instance_1977},{t:this.instance_1976},{t:this.instance_1975},{t:this.instance_1974},{t:this.instance_1973},{t:this.instance_1972},{t:this.instance_1971},{t:this.instance_1970},{t:this.instance_1969},{t:this.instance_1968},{t:this.instance_1967},{t:this.instance_1966},{t:this.instance_1965},{t:this.instance_1964},{t:this.instance_1963},{t:this.instance_1962},{t:this.instance_1961},{t:this.instance_1960},{t:this.instance_1959},{t:this.instance_1958},{t:this.instance_1957},{t:this.instance_1956},{t:this.instance_1955},{t:this.instance_1954},{t:this.instance_1953},{t:this.instance_1952},{t:this.instance_1951},{t:this.instance_1950},{t:this.instance_1949},{t:this.instance_1948},{t:this.instance_1947},{t:this.instance_1946},{t:this.instance_1945},{t:this.instance_1944},{t:this.instance_1943},{t:this.instance_1942},{t:this.instance_1941},{t:this.instance_1940},{t:this.instance_1939},{t:this.instance_1938},{t:this.instance_1937},{t:this.instance_1936},{t:this.instance_1935},{t:this.instance_1934},{t:this.instance_1933},{t:this.instance_1932},{t:this.instance_1931},{t:this.instance_1930},{t:this.instance_1929},{t:this.instance_1928},{t:this.instance_1927},{t:this.instance_1926},{t:this.instance_1925},{t:this.instance_1924},{t:this.instance_1923},{t:this.instance_1922},{t:this.instance_1921},{t:this.instance_1920},{t:this.instance_1919},{t:this.instance_1918},{t:this.instance_1917},{t:this.instance_1916},{t:this.instance_1915},{t:this.instance_1914},{t:this.instance_1913},{t:this.instance_1912},{t:this.instance_1911},{t:this.instance_1910},{t:this.instance_1909},{t:this.instance_1908},{t:this.instance_1907},{t:this.instance_1906},{t:this.instance_1905},{t:this.instance_1904},{t:this.instance_1903},{t:this.instance_1902},{t:this.instance_1901},{t:this.instance_1900},{t:this.instance_1899},{t:this.instance_1898},{t:this.instance_1897},{t:this.instance_1896},{t:this.instance_1895},{t:this.instance_1894},{t:this.instance_1893},{t:this.instance_1892},{t:this.instance_1891},{t:this.instance_1890},{t:this.instance_1889},{t:this.instance_1888},{t:this.instance_1887},{t:this.instance_1886},{t:this.instance_1885},{t:this.instance_1884},{t:this.instance_1883},{t:this.instance_1882},{t:this.instance_1881},{t:this.instance_1880},{t:this.instance_1879},{t:this.instance_1878},{t:this.instance_1877},{t:this.instance_1876},{t:this.instance_1875},{t:this.instance_1874},{t:this.instance_1873},{t:this.instance_1872},{t:this.instance_1871},{t:this.instance_1870},{t:this.instance_1869},{t:this.instance_1868},{t:this.instance_1867},{t:this.instance_1866},{t:this.instance_1865},{t:this.instance_1864},{t:this.instance_1863},{t:this.instance_1862},{t:this.instance_1861},{t:this.instance_1860},{t:this.instance_1859},{t:this.instance_1858},{t:this.instance_1857},{t:this.instance_1856},{t:this.instance_1855},{t:this.instance_1854},{t:this.instance_1853},{t:this.instance_1852},{t:this.instance_1851},{t:this.instance_1850},{t:this.instance_1849},{t:this.instance_1848},{t:this.instance_1847},{t:this.instance_1846},{t:this.instance_1845},{t:this.instance_1844},{t:this.instance_1843},{t:this.instance_1842},{t:this.instance_1841},{t:this.instance_1840},{t:this.instance_1839},{t:this.instance_1838},{t:this.instance_1837},{t:this.instance_1836},{t:this.instance_1835},{t:this.instance_1834},{t:this.instance_1833},{t:this.instance_1832},{t:this.instance_1831},{t:this.instance_1830},{t:this.instance_1829},{t:this.instance_1828},{t:this.instance_1827},{t:this.instance_1826},{t:this.instance_1825},{t:this.instance_1824},{t:this.instance_1823},{t:this.instance_1822},{t:this.instance_1821},{t:this.instance_1820},{t:this.instance_1819},{t:this.instance_1818},{t:this.instance_1817},{t:this.instance_1816},{t:this.instance_1815},{t:this.instance_1814},{t:this.instance_1813},{t:this.instance_1812},{t:this.instance_1811},{t:this.instance_1810},{t:this.instance_1809},{t:this.instance_1808},{t:this.instance_1807},{t:this.instance_1806},{t:this.instance_1805},{t:this.instance_1804},{t:this.instance_1803},{t:this.instance_1802},{t:this.instance_1801},{t:this.instance_1800},{t:this.instance_1799},{t:this.instance_1798},{t:this.instance_1797},{t:this.instance_1796},{t:this.instance_1795},{t:this.instance_1794},{t:this.instance_1793},{t:this.instance_1792},{t:this.instance_1791},{t:this.instance_1790},{t:this.instance_1789},{t:this.instance_1788},{t:this.instance_1787},{t:this.instance_1786},{t:this.instance_1785},{t:this.instance_1784},{t:this.instance_1783},{t:this.instance_1782},{t:this.instance_1781},{t:this.instance_1780},{t:this.instance_1779},{t:this.instance_1778},{t:this.instance_1777},{t:this.instance_1776},{t:this.instance_1775},{t:this.instance_1774},{t:this.instance_1773},{t:this.instance_1772},{t:this.instance_1771},{t:this.instance_1770},{t:this.instance_1769},{t:this.instance_1768},{t:this.instance_1767},{t:this.instance_1766},{t:this.instance_1765},{t:this.instance_1764},{t:this.instance_1763},{t:this.instance_1762},{t:this.instance_1761},{t:this.instance_1760},{t:this.instance_1759},{t:this.instance_1758},{t:this.instance_1757},{t:this.instance_1756},{t:this.instance_1755},{t:this.instance_1754},{t:this.instance_1753},{t:this.instance_1752},{t:this.instance_1751},{t:this.instance_1750},{t:this.instance_1749},{t:this.instance_1748},{t:this.instance_1747},{t:this.instance_1746},{t:this.instance_1745},{t:this.instance_1744},{t:this.instance_1743},{t:this.instance_1742},{t:this.instance_1741},{t:this.instance_1740},{t:this.instance_1739},{t:this.instance_1738},{t:this.instance_1737},{t:this.instance_1736},{t:this.instance_1735},{t:this.instance_1734},{t:this.instance_1733},{t:this.instance_1732},{t:this.instance_1731},{t:this.instance_1730},{t:this.instance_1729},{t:this.instance_1728},{t:this.instance_1727},{t:this.instance_1726},{t:this.instance_1725},{t:this.instance_1724},{t:this.instance_1723},{t:this.instance_1722},{t:this.instance_1721},{t:this.instance_1720},{t:this.instance_1719},{t:this.instance_1718},{t:this.instance_1717},{t:this.instance_1716},{t:this.instance_1715},{t:this.instance_1714},{t:this.instance_1713},{t:this.instance_1712},{t:this.instance_1711},{t:this.instance_1710},{t:this.instance_1709},{t:this.instance_1708},{t:this.instance_1707},{t:this.instance_1706},{t:this.instance_1705},{t:this.instance_1704},{t:this.instance_1703},{t:this.instance_1702},{t:this.instance_1701},{t:this.instance_1700},{t:this.instance_1699},{t:this.instance_1698},{t:this.instance_1697},{t:this.instance_1696},{t:this.instance_1695},{t:this.instance_1694},{t:this.instance_1693},{t:this.instance_1692},{t:this.instance_1691},{t:this.instance_1690},{t:this.instance_1689},{t:this.instance_1688},{t:this.instance_1687},{t:this.instance_1686},{t:this.instance_1685},{t:this.instance_1684},{t:this.instance_1683},{t:this.instance_1682},{t:this.instance_1681},{t:this.instance_1680},{t:this.instance_1679},{t:this.instance_1678},{t:this.instance_1677},{t:this.instance_1676},{t:this.instance_1675},{t:this.instance_1674},{t:this.instance_1673},{t:this.instance_1672},{t:this.instance_1671},{t:this.instance_1670},{t:this.instance_1669},{t:this.instance_1668},{t:this.instance_1667},{t:this.instance_1666},{t:this.instance_1665},{t:this.instance_1664},{t:this.instance_1663},{t:this.instance_1662},{t:this.instance_1661},{t:this.instance_1660},{t:this.instance_1659},{t:this.instance_1658},{t:this.instance_1657},{t:this.instance_1656},{t:this.instance_1655},{t:this.instance_1654},{t:this.instance_1653},{t:this.instance_1652},{t:this.instance_1651},{t:this.instance_1650},{t:this.instance_1649},{t:this.instance_1648},{t:this.instance_1647},{t:this.instance_1646},{t:this.instance_1645},{t:this.instance_1644},{t:this.instance_1643},{t:this.instance_1642},{t:this.instance_1641},{t:this.instance_1640},{t:this.instance_1639},{t:this.instance_1638},{t:this.instance_1637},{t:this.instance_1636},{t:this.instance_1635},{t:this.instance_1634},{t:this.instance_1633},{t:this.instance_1632},{t:this.instance_1631},{t:this.instance_1630},{t:this.instance_1629},{t:this.instance_1628},{t:this.instance_1627},{t:this.instance_1626},{t:this.instance_1625},{t:this.instance_1624},{t:this.instance_1623},{t:this.instance_1622},{t:this.instance_1621},{t:this.instance_1620},{t:this.instance_1619},{t:this.instance_1618},{t:this.instance_1617},{t:this.instance_1616},{t:this.instance_1615},{t:this.instance_1614},{t:this.instance_1613},{t:this.instance_1612},{t:this.instance_1611},{t:this.instance_1610},{t:this.instance_1609},{t:this.instance_1608},{t:this.instance_1607},{t:this.instance_1606},{t:this.instance_1605},{t:this.instance_1604},{t:this.instance_1603},{t:this.instance_1602},{t:this.instance_1601},{t:this.instance_1600},{t:this.instance_1599},{t:this.instance_1598},{t:this.instance_1597},{t:this.instance_1596},{t:this.instance_1595},{t:this.instance_1594},{t:this.instance_1593},{t:this.instance_1592},{t:this.instance_1591},{t:this.instance_1590},{t:this.instance_1589},{t:this.instance_1588},{t:this.instance_1587},{t:this.instance_1586},{t:this.instance_1585},{t:this.instance_1584},{t:this.instance_1583},{t:this.instance_1582},{t:this.instance_1581},{t:this.instance_1580},{t:this.instance_1579},{t:this.instance_1578},{t:this.instance_1577},{t:this.instance_1576},{t:this.instance_1575},{t:this.instance_1574},{t:this.instance_1573},{t:this.instance_1572},{t:this.instance_1571},{t:this.instance_1570},{t:this.instance_1569},{t:this.instance_1568},{t:this.instance_1567},{t:this.instance_1566},{t:this.instance_1565},{t:this.instance_1564},{t:this.instance_1563},{t:this.instance_1562},{t:this.instance_1561},{t:this.instance_1560},{t:this.instance_1559},{t:this.instance_1558},{t:this.instance_1557},{t:this.instance_1556},{t:this.instance_1555},{t:this.instance_1554},{t:this.instance_1553},{t:this.instance_1552},{t:this.instance_1551},{t:this.instance_1550},{t:this.instance_1549},{t:this.instance_1548},{t:this.instance_1547},{t:this.instance_1546},{t:this.instance_1545},{t:this.instance_1544},{t:this.instance_1543},{t:this.instance_1542},{t:this.instance_1541},{t:this.instance_1540},{t:this.instance_1539},{t:this.instance_1538},{t:this.instance_1537},{t:this.instance_1536},{t:this.instance_1535},{t:this.instance_1534},{t:this.instance_1533},{t:this.instance_1532},{t:this.instance_1531},{t:this.instance_1530},{t:this.instance_1529},{t:this.instance_1528},{t:this.instance_1527},{t:this.instance_1526},{t:this.instance_1525},{t:this.instance_1524},{t:this.instance_1523},{t:this.instance_1522},{t:this.instance_1521},{t:this.instance_1520},{t:this.instance_1519},{t:this.instance_1518},{t:this.instance_1517},{t:this.instance_1516},{t:this.instance_1515},{t:this.instance_1514},{t:this.instance_1513},{t:this.instance_1512},{t:this.instance_1511},{t:this.instance_1510},{t:this.instance_1509},{t:this.instance_1508},{t:this.instance_1507},{t:this.instance_1506},{t:this.instance_1505},{t:this.instance_1504},{t:this.instance_1503},{t:this.instance_1502},{t:this.instance_1501},{t:this.instance_1500},{t:this.instance_1499},{t:this.instance_1498},{t:this.instance_1497},{t:this.instance_1496},{t:this.instance_1495},{t:this.instance_1494},{t:this.instance_1493},{t:this.instance_1492},{t:this.instance_1491},{t:this.instance_1490},{t:this.instance_1489},{t:this.instance_1488},{t:this.instance_1487},{t:this.instance_1486},{t:this.instance_1485},{t:this.instance_1484},{t:this.instance_1483},{t:this.instance_1482},{t:this.instance_1481},{t:this.instance_1480},{t:this.instance_1479},{t:this.instance_1478},{t:this.instance_1477},{t:this.instance_1476},{t:this.instance_1475},{t:this.instance_1474},{t:this.instance_1473},{t:this.instance_1472},{t:this.instance_1471},{t:this.instance_1470},{t:this.instance_1469},{t:this.instance_1468},{t:this.instance_1467},{t:this.instance_1466},{t:this.instance_1465},{t:this.instance_1464},{t:this.instance_1463},{t:this.instance_1462},{t:this.instance_1461},{t:this.instance_1460},{t:this.instance_1459},{t:this.instance_1458},{t:this.instance_1457},{t:this.instance_1456},{t:this.instance_1455},{t:this.instance_1454},{t:this.instance_1453},{t:this.instance_1452},{t:this.instance_1451},{t:this.instance_1450},{t:this.instance_1449},{t:this.instance_1448},{t:this.instance_1447},{t:this.instance_1446},{t:this.instance_1445},{t:this.instance_1444},{t:this.instance_1443},{t:this.instance_1442},{t:this.instance_1441},{t:this.instance_1440},{t:this.instance_1439},{t:this.instance_1438},{t:this.instance_1437},{t:this.instance_1436},{t:this.instance_1435},{t:this.instance_1434},{t:this.instance_1433},{t:this.instance_1432},{t:this.instance_1431},{t:this.instance_1430},{t:this.instance_1429},{t:this.instance_1428},{t:this.instance_1427},{t:this.instance_1426},{t:this.instance_1425},{t:this.instance_1424},{t:this.instance_1423},{t:this.instance_1422},{t:this.instance_1421},{t:this.instance_1420},{t:this.instance_1419},{t:this.instance_1418},{t:this.instance_1417},{t:this.instance_1416},{t:this.instance_1415},{t:this.instance_1414},{t:this.instance_1413},{t:this.instance_1412},{t:this.instance_1411},{t:this.instance_1410},{t:this.instance_1409},{t:this.instance_1408},{t:this.instance_1407},{t:this.instance_1406},{t:this.instance_1405},{t:this.instance_1404},{t:this.instance_1403},{t:this.instance_1402},{t:this.instance_1401},{t:this.instance_1400},{t:this.instance_1399},{t:this.instance_1398},{t:this.instance_1397},{t:this.instance_1396},{t:this.instance_1395},{t:this.instance_1394},{t:this.instance_1393},{t:this.instance_1392},{t:this.instance_1391},{t:this.instance_1390},{t:this.instance_1389},{t:this.instance_1388},{t:this.instance_1387},{t:this.instance_1386},{t:this.instance_1385},{t:this.instance_1384},{t:this.instance_1383},{t:this.instance_1382},{t:this.instance_1381},{t:this.instance_1380},{t:this.instance_1379},{t:this.instance_1378},{t:this.instance_1377},{t:this.instance_1376},{t:this.instance_1375},{t:this.instance_1374},{t:this.instance_1373},{t:this.instance_1372},{t:this.instance_1371},{t:this.instance_1370},{t:this.instance_1369},{t:this.instance_1368},{t:this.instance_1367},{t:this.instance_1366},{t:this.instance_1365},{t:this.instance_1364},{t:this.instance_1363},{t:this.instance_1362},{t:this.instance_1361},{t:this.instance_1360},{t:this.instance_1359},{t:this.instance_1358},{t:this.instance_1357},{t:this.instance_1356},{t:this.instance_1355},{t:this.instance_1354},{t:this.instance_1353},{t:this.instance_1352},{t:this.instance_1351},{t:this.instance_1350},{t:this.instance_1349},{t:this.instance_1348},{t:this.instance_1347},{t:this.instance_1346},{t:this.instance_1345},{t:this.instance_1344},{t:this.instance_1343},{t:this.instance_1342},{t:this.instance_1341},{t:this.instance_1340},{t:this.instance_1339},{t:this.instance_1338},{t:this.instance_1337},{t:this.instance_1336},{t:this.instance_1335},{t:this.instance_1334},{t:this.instance_1333},{t:this.instance_1332},{t:this.instance_1331},{t:this.instance_1330},{t:this.instance_1329},{t:this.instance_1328},{t:this.instance_1327},{t:this.instance_1326},{t:this.instance_1325},{t:this.instance_1324},{t:this.instance_1323},{t:this.instance_1322},{t:this.instance_1321},{t:this.instance_1320},{t:this.instance_1319},{t:this.instance_1318},{t:this.instance_1317},{t:this.instance_1316},{t:this.instance_1315},{t:this.instance_1314},{t:this.instance_1313},{t:this.instance_1312},{t:this.instance_1311},{t:this.instance_1310},{t:this.instance_1309},{t:this.instance_1308},{t:this.instance_1307},{t:this.instance_1306},{t:this.instance_1305},{t:this.instance_1304},{t:this.instance_1303},{t:this.instance_1302},{t:this.instance_1301},{t:this.instance_1300},{t:this.instance_1299},{t:this.instance_1298},{t:this.instance_1297},{t:this.instance_1296},{t:this.instance_1295},{t:this.instance_1294},{t:this.instance_1293},{t:this.instance_1292},{t:this.instance_1291},{t:this.instance_1290},{t:this.instance_1289},{t:this.instance_1288},{t:this.instance_1287},{t:this.instance_1286},{t:this.instance_1285},{t:this.instance_1284},{t:this.instance_1283},{t:this.instance_1282},{t:this.instance_1281},{t:this.instance_1280},{t:this.instance_1279},{t:this.instance_1278},{t:this.instance_1277},{t:this.instance_1276},{t:this.instance_1275},{t:this.instance_1274},{t:this.instance_1273},{t:this.instance_1272},{t:this.instance_1271},{t:this.instance_1270},{t:this.instance_1269},{t:this.instance_1268},{t:this.instance_1267},{t:this.instance_1266},{t:this.instance_1265},{t:this.instance_1264},{t:this.instance_1263},{t:this.instance_1262},{t:this.instance_1261},{t:this.instance_1260},{t:this.instance_1259},{t:this.instance_1258},{t:this.instance_1257},{t:this.instance_1256},{t:this.instance_1255},{t:this.instance_1254},{t:this.instance_1253},{t:this.instance_1252},{t:this.instance_1251},{t:this.instance_1250},{t:this.instance_1249},{t:this.instance_1248},{t:this.instance_1247},{t:this.instance_1246},{t:this.instance_1245},{t:this.instance_1244},{t:this.instance_1243},{t:this.instance_1242},{t:this.instance_1241},{t:this.instance_1240},{t:this.instance_1239},{t:this.instance_1238},{t:this.instance_1237},{t:this.instance_1236},{t:this.instance_1235},{t:this.instance_1234},{t:this.instance_1233},{t:this.instance_1232},{t:this.instance_1231},{t:this.instance_1230},{t:this.instance_1229},{t:this.instance_1228},{t:this.instance_1227},{t:this.instance_1226},{t:this.instance_1225},{t:this.instance_1224},{t:this.instance_1223},{t:this.instance_1222},{t:this.instance_1221},{t:this.instance_1220},{t:this.instance_1219},{t:this.instance_1218},{t:this.instance_1217},{t:this.instance_1216},{t:this.instance_1215},{t:this.instance_1214},{t:this.instance_1213},{t:this.instance_1212},{t:this.instance_1211},{t:this.instance_1210},{t:this.instance_1209},{t:this.instance_1208},{t:this.instance_1207},{t:this.instance_1206},{t:this.instance_1205},{t:this.instance_1204},{t:this.instance_1203},{t:this.instance_1202},{t:this.instance_1201},{t:this.instance_1200},{t:this.instance_1199},{t:this.instance_1198},{t:this.instance_1197},{t:this.instance_1196},{t:this.instance_1195},{t:this.instance_1194},{t:this.instance_1193},{t:this.instance_1192},{t:this.instance_1191},{t:this.instance_1190},{t:this.instance_1189},{t:this.instance_1188},{t:this.instance_1187},{t:this.instance_1186},{t:this.instance_1185},{t:this.instance_1184},{t:this.instance_1183},{t:this.instance_1182},{t:this.instance_1181},{t:this.instance_1180},{t:this.instance_1179},{t:this.instance_1178},{t:this.instance_1177},{t:this.instance_1176},{t:this.instance_1175},{t:this.instance_1174},{t:this.instance_1173},{t:this.instance_1172},{t:this.instance_1171},{t:this.instance_1170},{t:this.instance_1169},{t:this.instance_1168},{t:this.instance_1167},{t:this.instance_1166},{t:this.instance_1165},{t:this.instance_1164},{t:this.instance_1163},{t:this.instance_1162},{t:this.instance_1161},{t:this.instance_1160},{t:this.instance_1159},{t:this.instance_1158},{t:this.instance_1157},{t:this.instance_1156},{t:this.instance_1155},{t:this.instance_1154},{t:this.instance_1153},{t:this.instance_1152},{t:this.instance_1151},{t:this.instance_1150},{t:this.instance_1149},{t:this.instance_1148},{t:this.instance_1147},{t:this.instance_1146},{t:this.instance_1145},{t:this.instance_1144},{t:this.instance_1143},{t:this.instance_1142},{t:this.instance_1141},{t:this.instance_1140},{t:this.instance_1139},{t:this.instance_1138},{t:this.instance_1137},{t:this.instance_1136},{t:this.instance_1135},{t:this.instance_1134},{t:this.instance_1133},{t:this.instance_1132},{t:this.instance_1131},{t:this.instance_1130},{t:this.instance_1129},{t:this.instance_1128},{t:this.instance_1127},{t:this.instance_1126},{t:this.instance_1125},{t:this.instance_1124},{t:this.instance_1123},{t:this.instance_1122},{t:this.instance_1121},{t:this.instance_1120},{t:this.instance_1119},{t:this.instance_1118},{t:this.instance_1117},{t:this.instance_1116},{t:this.instance_1115},{t:this.instance_1114},{t:this.instance_1113},{t:this.instance_1112},{t:this.instance_1111},{t:this.instance_1110},{t:this.instance_1109},{t:this.instance_1108},{t:this.instance_1107},{t:this.instance_1106},{t:this.instance_1105},{t:this.instance_1104},{t:this.instance_1103},{t:this.instance_1102},{t:this.instance_1101},{t:this.instance_1100},{t:this.instance_1099},{t:this.instance_1098},{t:this.instance_1097},{t:this.instance_1096},{t:this.instance_1095},{t:this.instance_1094},{t:this.instance_1093},{t:this.instance_1092},{t:this.instance_1091},{t:this.instance_1090},{t:this.instance_1089},{t:this.instance_1088},{t:this.instance_1087},{t:this.instance_1086},{t:this.instance_1085},{t:this.instance_1084},{t:this.instance_1083},{t:this.instance_1082},{t:this.instance_1081},{t:this.instance_1080},{t:this.instance_1079},{t:this.instance_1078},{t:this.instance_1077},{t:this.instance_1076},{t:this.instance_1075},{t:this.instance_1074},{t:this.instance_1073},{t:this.instance_1072},{t:this.instance_1071},{t:this.instance_1070},{t:this.instance_1069},{t:this.instance_1068},{t:this.instance_1067},{t:this.instance_1066},{t:this.instance_1065},{t:this.instance_1064},{t:this.instance_1063},{t:this.instance_1062},{t:this.instance_1061},{t:this.instance_1060},{t:this.instance_1059},{t:this.instance_1058},{t:this.instance_1057},{t:this.instance_1056},{t:this.instance_1055},{t:this.instance_1054},{t:this.instance_1053},{t:this.instance_1052},{t:this.instance_1051},{t:this.instance_1050},{t:this.instance_1049},{t:this.instance_1048},{t:this.instance_1047},{t:this.instance_1046},{t:this.instance_1045},{t:this.instance_1044},{t:this.instance_1043},{t:this.instance_1042},{t:this.instance_1041},{t:this.instance_1040},{t:this.instance_1039},{t:this.instance_1038},{t:this.instance_1037},{t:this.instance_1036},{t:this.instance_1035},{t:this.instance_1034},{t:this.instance_1033},{t:this.instance_1032},{t:this.instance_1031},{t:this.instance_1030},{t:this.instance_1029},{t:this.instance_1028},{t:this.instance_1027},{t:this.instance_1026},{t:this.instance_1025},{t:this.instance_1024},{t:this.instance_1023},{t:this.instance_1022},{t:this.instance_1021},{t:this.instance_1020},{t:this.instance_1019},{t:this.instance_1018},{t:this.instance_1017},{t:this.instance_1016},{t:this.instance_1015},{t:this.instance_1014},{t:this.instance_1013},{t:this.instance_1012},{t:this.instance_1011},{t:this.instance_1010},{t:this.instance_1009},{t:this.instance_1008},{t:this.instance_1007},{t:this.instance_1006},{t:this.instance_1005},{t:this.instance_1004},{t:this.instance_1003},{t:this.instance_1002},{t:this.instance_1001},{t:this.instance_1000},{t:this.instance_999},{t:this.instance_998},{t:this.instance_997},{t:this.instance_996},{t:this.instance_995},{t:this.instance_994},{t:this.instance_993},{t:this.instance_992},{t:this.instance_991},{t:this.instance_990},{t:this.instance_989},{t:this.instance_988},{t:this.instance_987},{t:this.instance_986},{t:this.instance_985},{t:this.instance_984},{t:this.instance_983},{t:this.instance_982},{t:this.instance_981},{t:this.instance_980},{t:this.instance_979},{t:this.instance_978},{t:this.instance_977},{t:this.instance_976},{t:this.instance_975},{t:this.instance_974},{t:this.instance_973},{t:this.instance_972},{t:this.instance_971},{t:this.instance_970},{t:this.instance_969},{t:this.instance_968},{t:this.instance_967},{t:this.instance_966},{t:this.instance_965},{t:this.instance_964},{t:this.instance_963},{t:this.instance_962},{t:this.instance_961},{t:this.instance_960},{t:this.instance_959},{t:this.instance_958},{t:this.instance_957},{t:this.instance_956},{t:this.instance_955},{t:this.instance_954},{t:this.instance_953},{t:this.instance_952},{t:this.instance_951},{t:this.instance_950},{t:this.instance_949},{t:this.instance_948},{t:this.instance_947},{t:this.instance_946},{t:this.instance_945},{t:this.instance_944},{t:this.instance_943},{t:this.instance_942},{t:this.instance_941},{t:this.instance_940},{t:this.instance_939},{t:this.instance_938},{t:this.instance_937},{t:this.instance_936},{t:this.instance_935},{t:this.instance_934},{t:this.instance_933},{t:this.instance_932},{t:this.instance_931},{t:this.instance_930},{t:this.instance_929},{t:this.instance_928},{t:this.instance_927},{t:this.instance_926},{t:this.instance_925},{t:this.instance_924},{t:this.instance_923},{t:this.instance_922},{t:this.instance_921},{t:this.instance_920},{t:this.instance_919},{t:this.instance_918},{t:this.instance_917},{t:this.instance_916},{t:this.instance_915},{t:this.instance_914},{t:this.instance_913},{t:this.instance_912},{t:this.instance_911},{t:this.instance_910},{t:this.instance_909},{t:this.instance_908},{t:this.instance_907},{t:this.instance_906},{t:this.instance_905},{t:this.instance_904},{t:this.instance_903},{t:this.instance_902},{t:this.instance_901},{t:this.instance_900},{t:this.instance_899},{t:this.instance_898},{t:this.instance_897},{t:this.instance_896},{t:this.instance_895},{t:this.instance_894},{t:this.instance_893},{t:this.instance_892},{t:this.instance_891},{t:this.instance_890},{t:this.instance_889},{t:this.instance_888},{t:this.instance_887},{t:this.instance_886},{t:this.instance_885},{t:this.instance_884},{t:this.instance_883},{t:this.instance_882},{t:this.instance_881},{t:this.instance_880},{t:this.instance_879},{t:this.instance_878},{t:this.instance_877},{t:this.instance_876},{t:this.instance_875},{t:this.instance_874},{t:this.instance_873},{t:this.instance_872},{t:this.instance_871},{t:this.instance_870},{t:this.instance_869},{t:this.instance_868},{t:this.instance_867},{t:this.instance_866},{t:this.instance_865},{t:this.instance_864},{t:this.instance_863},{t:this.instance_862},{t:this.instance_861},{t:this.instance_860},{t:this.instance_859},{t:this.instance_858},{t:this.instance_857},{t:this.instance_856},{t:this.instance_855},{t:this.instance_854},{t:this.instance_853},{t:this.instance_852},{t:this.instance_851},{t:this.instance_850},{t:this.instance_849},{t:this.instance_848},{t:this.instance_847},{t:this.instance_846},{t:this.instance_845},{t:this.instance_844},{t:this.instance_843},{t:this.instance_842},{t:this.instance_841},{t:this.instance_840},{t:this.instance_839},{t:this.instance_838},{t:this.instance_837},{t:this.instance_836},{t:this.instance_835},{t:this.instance_834},{t:this.instance_833},{t:this.instance_832},{t:this.instance_831},{t:this.instance_830},{t:this.instance_829},{t:this.instance_828},{t:this.instance_827},{t:this.instance_826},{t:this.instance_825},{t:this.instance_824},{t:this.instance_823},{t:this.instance_822},{t:this.instance_821},{t:this.instance_820},{t:this.instance_819},{t:this.instance_818},{t:this.instance_817},{t:this.instance_816},{t:this.instance_815},{t:this.instance_814},{t:this.instance_813},{t:this.instance_812},{t:this.instance_811},{t:this.instance_810},{t:this.instance_809},{t:this.instance_808},{t:this.instance_807},{t:this.instance_806},{t:this.instance_805},{t:this.instance_804},{t:this.instance_803},{t:this.instance_802},{t:this.instance_801},{t:this.instance_800},{t:this.instance_799},{t:this.instance_798},{t:this.instance_797},{t:this.instance_796},{t:this.instance_795},{t:this.instance_794},{t:this.instance_793},{t:this.instance_792},{t:this.instance_791},{t:this.instance_790},{t:this.instance_789},{t:this.instance_788},{t:this.instance_787},{t:this.instance_786},{t:this.instance_785},{t:this.instance_784},{t:this.instance_783},{t:this.instance_782},{t:this.instance_781},{t:this.instance_780},{t:this.instance_779},{t:this.instance_778},{t:this.instance_777},{t:this.instance_776},{t:this.instance_775},{t:this.instance_774},{t:this.instance_773},{t:this.instance_772},{t:this.instance_771},{t:this.instance_770},{t:this.instance_769},{t:this.instance_768},{t:this.instance_767},{t:this.instance_766},{t:this.instance_765},{t:this.instance_764},{t:this.instance_763},{t:this.instance_762},{t:this.instance_761},{t:this.instance_760},{t:this.instance_759},{t:this.instance_758},{t:this.instance_757},{t:this.instance_756},{t:this.instance_755},{t:this.instance_754},{t:this.instance_753},{t:this.instance_752},{t:this.instance_751},{t:this.instance_750},{t:this.instance_749},{t:this.instance_748},{t:this.instance_747},{t:this.instance_746},{t:this.instance_745},{t:this.instance_744},{t:this.instance_743},{t:this.instance_742},{t:this.instance_741},{t:this.instance_740},{t:this.instance_739},{t:this.instance_738},{t:this.instance_737},{t:this.instance_736},{t:this.instance_735},{t:this.instance_734},{t:this.instance_733},{t:this.instance_732},{t:this.instance_731},{t:this.instance_730},{t:this.instance_729},{t:this.instance_728},{t:this.instance_727},{t:this.instance_726},{t:this.instance_725},{t:this.instance_724},{t:this.instance_723},{t:this.instance_722},{t:this.instance_721},{t:this.instance_720},{t:this.instance_719},{t:this.instance_718},{t:this.instance_717},{t:this.instance_716},{t:this.instance_715},{t:this.instance_714},{t:this.instance_713},{t:this.instance_712},{t:this.instance_711},{t:this.instance_710},{t:this.instance_709},{t:this.instance_708},{t:this.instance_707},{t:this.instance_706},{t:this.instance_705},{t:this.instance_704},{t:this.instance_703},{t:this.instance_702},{t:this.instance_701},{t:this.instance_700},{t:this.instance_699},{t:this.instance_698},{t:this.instance_697},{t:this.instance_696},{t:this.instance_695},{t:this.instance_694},{t:this.instance_693},{t:this.instance_692},{t:this.instance_691},{t:this.instance_690},{t:this.instance_689},{t:this.instance_688},{t:this.instance_687},{t:this.instance_686},{t:this.instance_685},{t:this.instance_684},{t:this.instance_683},{t:this.instance_682},{t:this.instance_681},{t:this.instance_680},{t:this.instance_679},{t:this.instance_678},{t:this.instance_677},{t:this.instance_676},{t:this.instance_675},{t:this.instance_674},{t:this.instance_673},{t:this.instance_672},{t:this.instance_671},{t:this.instance_670},{t:this.instance_669},{t:this.instance_668},{t:this.instance_667},{t:this.instance_666},{t:this.instance_665},{t:this.instance_664},{t:this.instance_663},{t:this.instance_662},{t:this.instance_661},{t:this.instance_660},{t:this.instance_659},{t:this.instance_658},{t:this.instance_657},{t:this.instance_656},{t:this.instance_655},{t:this.instance_654},{t:this.instance_653},{t:this.instance_652},{t:this.instance_651},{t:this.instance_650},{t:this.instance_649},{t:this.instance_648},{t:this.instance_647},{t:this.instance_646},{t:this.instance_645},{t:this.instance_644},{t:this.instance_643},{t:this.instance_642},{t:this.instance_641},{t:this.instance_640},{t:this.instance_639},{t:this.instance_638},{t:this.instance_637},{t:this.instance_636},{t:this.instance_635},{t:this.instance_634},{t:this.instance_633},{t:this.instance_632},{t:this.instance_631},{t:this.instance_630},{t:this.instance_629},{t:this.instance_628},{t:this.instance_627},{t:this.instance_626},{t:this.instance_625},{t:this.instance_624},{t:this.instance_623},{t:this.instance_622},{t:this.instance_621},{t:this.instance_620},{t:this.instance_619},{t:this.instance_618},{t:this.instance_617},{t:this.instance_616},{t:this.instance_615},{t:this.instance_614},{t:this.instance_613},{t:this.instance_612},{t:this.instance_611},{t:this.instance_610},{t:this.instance_609},{t:this.instance_608},{t:this.instance_607},{t:this.instance_606},{t:this.instance_605},{t:this.instance_604},{t:this.instance_603},{t:this.instance_602},{t:this.instance_601},{t:this.instance_600},{t:this.instance_599},{t:this.instance_598},{t:this.instance_597},{t:this.instance_596},{t:this.instance_595},{t:this.instance_594},{t:this.instance_593},{t:this.instance_592},{t:this.instance_591},{t:this.instance_590},{t:this.instance_589},{t:this.instance_588},{t:this.instance_587},{t:this.instance_586},{t:this.instance_585},{t:this.instance_584},{t:this.instance_583},{t:this.instance_582},{t:this.instance_581},{t:this.instance_580},{t:this.instance_579},{t:this.instance_578},{t:this.instance_577},{t:this.instance_576},{t:this.instance_575},{t:this.instance_574},{t:this.instance_573},{t:this.instance_572},{t:this.instance_571},{t:this.instance_570},{t:this.instance_569},{t:this.instance_568},{t:this.instance_567},{t:this.instance_566},{t:this.instance_565},{t:this.instance_564},{t:this.instance_563},{t:this.instance_562},{t:this.instance_561},{t:this.instance_560},{t:this.instance_559},{t:this.instance_558},{t:this.instance_557},{t:this.instance_556},{t:this.instance_555},{t:this.instance_554},{t:this.instance_553},{t:this.instance_552},{t:this.instance_551},{t:this.instance_550},{t:this.instance_549},{t:this.instance_548},{t:this.instance_547},{t:this.instance_546},{t:this.instance_545},{t:this.instance_544},{t:this.instance_543},{t:this.instance_542},{t:this.instance_541},{t:this.instance_540},{t:this.instance_539},{t:this.instance_538},{t:this.instance_537},{t:this.instance_536},{t:this.instance_535},{t:this.instance_534},{t:this.instance_533},{t:this.instance_532},{t:this.instance_531},{t:this.instance_530},{t:this.instance_529},{t:this.instance_528},{t:this.instance_527},{t:this.instance_526},{t:this.instance_525},{t:this.instance_524},{t:this.instance_523},{t:this.instance_522},{t:this.instance_521},{t:this.instance_520},{t:this.instance_519},{t:this.instance_518},{t:this.instance_517},{t:this.instance_516},{t:this.instance_515},{t:this.instance_514},{t:this.instance_513},{t:this.instance_512},{t:this.instance_511},{t:this.instance_510},{t:this.instance_509},{t:this.instance_508},{t:this.instance_507},{t:this.instance_506},{t:this.instance_505},{t:this.instance_504},{t:this.instance_503},{t:this.instance_502},{t:this.instance_501},{t:this.instance_500},{t:this.instance_499},{t:this.instance_498},{t:this.instance_497},{t:this.instance_496},{t:this.instance_495},{t:this.instance_494},{t:this.instance_493},{t:this.instance_492},{t:this.instance_491},{t:this.instance_490},{t:this.instance_489},{t:this.instance_488},{t:this.instance_487},{t:this.instance_486},{t:this.instance_485},{t:this.instance_484},{t:this.instance_483},{t:this.instance_482},{t:this.instance_481},{t:this.instance_480},{t:this.instance_479},{t:this.instance_478},{t:this.instance_477},{t:this.instance_476},{t:this.instance_475},{t:this.instance_474},{t:this.instance_473},{t:this.instance_472},{t:this.instance_471},{t:this.instance_470},{t:this.instance_469},{t:this.instance_468},{t:this.instance_467},{t:this.instance_466},{t:this.instance_465},{t:this.instance_464},{t:this.instance_463},{t:this.instance_462},{t:this.instance_461},{t:this.instance_460},{t:this.instance_459},{t:this.instance_458},{t:this.instance_457},{t:this.instance_456},{t:this.instance_455},{t:this.instance_454},{t:this.instance_453},{t:this.instance_452},{t:this.instance_451},{t:this.instance_450},{t:this.instance_449},{t:this.instance_448},{t:this.instance_447},{t:this.instance_446},{t:this.instance_445},{t:this.instance_444},{t:this.instance_443},{t:this.instance_442},{t:this.instance_441},{t:this.instance_440},{t:this.instance_439},{t:this.instance_438},{t:this.instance_437},{t:this.instance_436},{t:this.instance_435},{t:this.instance_434},{t:this.instance_433},{t:this.instance_432},{t:this.instance_431},{t:this.instance_430},{t:this.instance_429},{t:this.instance_428},{t:this.instance_427},{t:this.instance_426},{t:this.instance_425},{t:this.instance_424},{t:this.instance_423},{t:this.instance_422},{t:this.instance_421},{t:this.instance_420},{t:this.instance_419},{t:this.instance_418},{t:this.instance_417},{t:this.instance_416},{t:this.instance_415},{t:this.instance_414},{t:this.instance_413},{t:this.instance_412},{t:this.instance_411},{t:this.instance_410},{t:this.instance_409},{t:this.instance_408},{t:this.instance_407},{t:this.instance_406},{t:this.instance_405},{t:this.instance_404},{t:this.instance_403},{t:this.instance_402},{t:this.instance_401},{t:this.instance_400},{t:this.instance_399},{t:this.instance_398},{t:this.instance_397},{t:this.instance_396},{t:this.instance_395},{t:this.instance_394},{t:this.instance_393},{t:this.instance_392},{t:this.instance_391},{t:this.instance_390},{t:this.instance_389},{t:this.instance_388},{t:this.instance_387},{t:this.instance_386},{t:this.instance_385},{t:this.instance_384},{t:this.instance_383},{t:this.instance_382},{t:this.instance_381},{t:this.instance_380},{t:this.instance_379},{t:this.instance_378},{t:this.instance_377},{t:this.instance_376},{t:this.instance_375},{t:this.instance_374},{t:this.instance_373},{t:this.instance_372},{t:this.instance_371},{t:this.instance_370},{t:this.instance_369},{t:this.instance_368},{t:this.instance_367},{t:this.instance_366},{t:this.instance_365},{t:this.instance_364},{t:this.instance_363},{t:this.instance_362},{t:this.instance_361},{t:this.instance_360},{t:this.instance_359},{t:this.instance_358},{t:this.instance_357},{t:this.instance_356},{t:this.instance_355},{t:this.instance_354},{t:this.instance_353},{t:this.instance_352},{t:this.instance_351},{t:this.instance_350},{t:this.instance_349},{t:this.instance_348},{t:this.instance_347},{t:this.instance_346},{t:this.instance_345},{t:this.instance_344},{t:this.instance_343},{t:this.instance_342},{t:this.instance_341},{t:this.instance_340},{t:this.instance_339},{t:this.instance_338},{t:this.instance_337},{t:this.instance_336},{t:this.instance_335},{t:this.instance_334},{t:this.instance_333},{t:this.instance_332},{t:this.instance_331},{t:this.instance_330},{t:this.instance_329},{t:this.instance_328},{t:this.instance_327},{t:this.instance_326},{t:this.instance_325},{t:this.instance_324},{t:this.instance_323},{t:this.instance_322},{t:this.instance_321},{t:this.instance_320},{t:this.instance_319},{t:this.instance_318},{t:this.instance_317},{t:this.instance_316},{t:this.instance_315},{t:this.instance_314},{t:this.instance_313},{t:this.instance_312},{t:this.instance_311},{t:this.instance_310},{t:this.instance_309},{t:this.instance_308},{t:this.instance_307},{t:this.instance_306},{t:this.instance_305},{t:this.instance_304},{t:this.instance_303},{t:this.instance_302},{t:this.instance_301},{t:this.instance_300},{t:this.instance_299},{t:this.instance_298},{t:this.instance_297},{t:this.instance_296},{t:this.instance_295},{t:this.instance_294},{t:this.instance_293},{t:this.instance_292},{t:this.instance_291},{t:this.instance_290},{t:this.instance_289},{t:this.instance_288},{t:this.instance_287},{t:this.instance_286},{t:this.instance_285},{t:this.instance_284},{t:this.instance_283},{t:this.instance_282},{t:this.instance_281},{t:this.instance_280},{t:this.instance_279},{t:this.instance_278},{t:this.instance_277},{t:this.instance_276},{t:this.instance_275},{t:this.instance_274},{t:this.instance_273},{t:this.instance_272},{t:this.instance_271},{t:this.instance_270},{t:this.instance_269},{t:this.instance_268},{t:this.instance_267},{t:this.instance_266},{t:this.instance_265},{t:this.instance_264},{t:this.instance_263},{t:this.instance_262},{t:this.instance_261},{t:this.instance_260},{t:this.instance_259},{t:this.instance_258},{t:this.instance_257},{t:this.instance_256},{t:this.instance_255},{t:this.instance_254},{t:this.instance_253},{t:this.instance_252},{t:this.instance_251},{t:this.instance_250},{t:this.instance_249},{t:this.instance_248},{t:this.instance_247},{t:this.instance_246},{t:this.instance_245},{t:this.instance_244},{t:this.instance_243},{t:this.instance_242},{t:this.instance_241},{t:this.instance_240},{t:this.instance_239},{t:this.instance_238},{t:this.instance_237},{t:this.instance_236},{t:this.instance_235},{t:this.instance_234},{t:this.instance_233},{t:this.instance_232},{t:this.instance_231},{t:this.instance_230},{t:this.instance_229},{t:this.instance_228},{t:this.instance_227},{t:this.instance_226},{t:this.instance_225},{t:this.instance_224},{t:this.instance_223},{t:this.instance_222},{t:this.instance_221},{t:this.instance_220},{t:this.instance_219},{t:this.instance_218},{t:this.instance_217},{t:this.instance_216},{t:this.instance_215},{t:this.instance_214},{t:this.instance_213},{t:this.instance_212},{t:this.instance_211},{t:this.instance_210},{t:this.instance_209},{t:this.instance_208},{t:this.instance_207},{t:this.instance_206},{t:this.instance_205},{t:this.instance_204},{t:this.instance_203},{t:this.instance_202},{t:this.instance_201},{t:this.instance_200},{t:this.instance_199},{t:this.instance_198},{t:this.instance_197},{t:this.instance_196},{t:this.instance_195},{t:this.instance_194},{t:this.instance_193},{t:this.instance_192},{t:this.instance_191},{t:this.instance_190},{t:this.instance_189},{t:this.instance_188},{t:this.instance_187},{t:this.instance_186},{t:this.instance_185},{t:this.instance_184},{t:this.instance_183},{t:this.instance_182},{t:this.instance_181},{t:this.instance_180},{t:this.instance_179},{t:this.instance_178},{t:this.instance_177},{t:this.instance_176},{t:this.instance_175},{t:this.instance_174},{t:this.instance_173},{t:this.instance_172},{t:this.instance_171},{t:this.instance_170},{t:this.instance_169},{t:this.instance_168},{t:this.instance_167},{t:this.instance_166},{t:this.instance_165},{t:this.instance_164},{t:this.instance_163},{t:this.instance_162},{t:this.instance_161},{t:this.instance_160},{t:this.instance_159},{t:this.instance_158},{t:this.instance_157},{t:this.instance_156},{t:this.instance_155},{t:this.instance_154},{t:this.instance_153},{t:this.instance_152},{t:this.instance_151},{t:this.instance_150},{t:this.instance_149},{t:this.instance_148},{t:this.instance_147},{t:this.instance_146},{t:this.instance_145},{t:this.instance_144},{t:this.instance_143},{t:this.instance_142},{t:this.instance_141},{t:this.instance_140},{t:this.instance_139},{t:this.instance_138},{t:this.instance_137},{t:this.instance_136},{t:this.instance_135},{t:this.instance_134},{t:this.instance_133},{t:this.instance_132},{t:this.instance_131},{t:this.instance_130},{t:this.instance_129},{t:this.instance_128},{t:this.instance_127},{t:this.instance_126},{t:this.instance_125},{t:this.instance_124},{t:this.instance_123},{t:this.instance_122},{t:this.instance_121},{t:this.instance_120},{t:this.instance_119},{t:this.instance_118},{t:this.instance_117},{t:this.instance_116},{t:this.instance_115},{t:this.instance_114},{t:this.instance_113},{t:this.instance_112},{t:this.instance_111},{t:this.instance_110},{t:this.instance_109},{t:this.instance_108},{t:this.instance_107},{t:this.instance_106},{t:this.instance_105},{t:this.instance_104},{t:this.instance_103},{t:this.instance_102},{t:this.instance_101},{t:this.instance_100},{t:this.instance_99},{t:this.instance_98},{t:this.instance_97},{t:this.instance_96},{t:this.instance_95},{t:this.instance_94},{t:this.instance_93},{t:this.instance_92},{t:this.instance_91},{t:this.instance_90},{t:this.instance_89},{t:this.instance_88},{t:this.instance_87},{t:this.instance_86},{t:this.instance_85},{t:this.instance_84},{t:this.instance_83},{t:this.instance_82},{t:this.instance_81},{t:this.instance_80},{t:this.instance_79},{t:this.instance_78},{t:this.instance_77},{t:this.instance_76},{t:this.instance_75},{t:this.instance_74},{t:this.instance_73},{t:this.instance_72},{t:this.instance_71},{t:this.instance_70},{t:this.instance_69},{t:this.instance_68},{t:this.instance_67},{t:this.instance_66},{t:this.instance_65},{t:this.instance_64},{t:this.instance_63},{t:this.instance_62},{t:this.instance_61},{t:this.instance_60},{t:this.instance_59},{t:this.instance_58},{t:this.instance_57},{t:this.instance_56},{t:this.instance_55},{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51},{t:this.instance_50},{t:this.instance_49},{t:this.instance_48},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45},{t:this.instance_44},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(223.5,122.4,357.5,260.1);
// library properties:
lib.properties = {
	id: '2FA8E0C7230941478CE2CA3DB82DBEDF',
	width: 550,
	height: 400,
	fps: 60,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['2FA8E0C7230941478CE2CA3DB82DBEDF'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;