import React from 'react';
import { motion, type MotionValue, useTransform } from 'framer-motion';

interface MonolithPillarsProps { mouseX: MotionValue<number>; mouseY: MotionValue<number>; }

const Circuit = () => <div className="gateway-pillar__circuit" aria-hidden="true"><i /><i /><i /><i /></div>;
const Dashboard = () => <div className="gateway-card gateway-card--dashboard" aria-hidden="true"><small>SYS / PULSE</small><strong>284 <em>+12%</em></strong><div className="gateway-chart"><i /><i /><i /><i /><i /></div></div>;
const Code = () => <div className="gateway-card gateway-card--code" aria-hidden="true"><small>API / ORCHESTRATION</small><code>POST <b>/systems</b><br />sync: <b>active</b><br />latency: 42ms</code></div>;

export const MonolithPillars: React.FC<MonolithPillarsProps> = ({ mouseX, mouseY }) => {
  const leftX = useTransform(mouseX, [-0.5, 0.5], [-14, 14]);
  const rightX = useTransform(mouseX, [-0.5, 0.5], [-14, 14]);
  const leftRotate = useTransform(mouseX, [-0.5, 0.5], [4, -4]);
  const rightRotate = useTransform(mouseX, [-0.5, 0.5], [4, -4]);
  const lift = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  return <div className="gateway-pillars">
    <motion.div className="gateway-pillar gateway-pillar--left" style={{ x: leftX, y: lift, rotateY: leftRotate }}><Circuit /><Code /></motion.div>
    <motion.div className="gateway-pillar gateway-pillar--right" style={{ x: rightX, y: lift, rotateY: rightRotate }}><Circuit /><Dashboard /></motion.div>
  </div>;
};
