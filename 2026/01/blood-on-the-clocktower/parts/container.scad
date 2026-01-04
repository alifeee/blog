d=47;
h=40;
depth=75;
extrad1=50;
extrad2=30;
t=2;
cr=20;

totaldepth=t + depth + t + extrad1 + t + extrad2 + t;

difference() {
cube([
  t + d + t,
  totaldepth,
  t + h
]);

// first
translate([t,t,t])
cube([d, depth, d+t]);
// second
translate([t,t + depth + t,t])
cube([d, extrad1, d+t]);
// third
translate([t,t + depth + t + extrad1 + t,t])
cube([d, extrad2, d+t]);
    
translate([
    (t+d+t)/2,
    -t,
    (t+d) + 2
])
rotate([90,0,180])
cylinder(
    t + totaldepth + t,
    r=cr
);
}
