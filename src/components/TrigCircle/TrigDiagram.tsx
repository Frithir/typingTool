import {
  computeTrigGeometry,
  FUNCTION_COLORS,
  type Point,
  type TrigFunctionName,
} from "./utils";
import type { TrigDiagramProps } from "./TrigCircle.types";

const VIEWBOX = 500;
const CENTER = VIEWBOX / 2;
const RADIUS = 90;
// Segments like tan/sec blow up near 90°/270°. Clamp how far we draw them so
// the SVG stays legible - the numeric readout elsewhere stays exact.
const MAX_UNIT = 2.2;

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const toSvg = (p: Point): Point => ({
  x: CENTER + clamp(p.x, -MAX_UNIT, MAX_UNIT) * RADIUS,
  y: CENTER - clamp(p.y, -MAX_UNIT, MAX_UNIT) * RADIUS,
});

const arcPath = (angleDeg: number): string => {
  const arcR = 26;
  const steps = 24;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (angleDeg * i) / steps;
    const rad = (t * Math.PI) / 180;
    pts.push(
      `${CENTER + arcR * Math.cos(rad)},${CENTER - arcR * Math.sin(rad)}`
    );
  }
  return pts.join(" ");
};

export const TrigDiagram = ({
  angleDeg,
  size = 320,
  isolate,
}: TrigDiagramProps) => {
  const g = computeTrigGeometry(angleDeg);

  const point = toSvg(g.point);
  const cosFoot = toSvg(g.cosFoot);
  const sinFoot = toSvg(g.sinFoot);
  const origin = toSvg({ x: 0, y: 0 });
  const secPoint = g.secPoint ? toSvg(g.secPoint) : null;
  const cscPoint = g.cscPoint ? toSvg(g.cscPoint) : null;

  // Dim (rather than hide) segments other than the isolated one, so the
  // learner still sees where everything is while guessing which is which.
  const opacityFor = (fn: TrigFunctionName) =>
    !isolate || isolate === fn ? 1 : 0.12;
  const labelVisible = (fn: TrigFunctionName) => !isolate || isolate === fn;

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
      width={size}
      height={size}
      className="mx-auto"
    >
      {/* axes */}
      <line
        x1={0}
        y1={CENTER}
        x2={VIEWBOX}
        y2={CENTER}
        stroke="#4b5563"
        strokeWidth={1}
      />
      <line
        x1={CENTER}
        y1={0}
        x2={CENTER}
        y2={VIEWBOX}
        stroke="#4b5563"
        strokeWidth={1}
      />

      {/* unit circle */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        stroke="#6b7280"
        strokeWidth={1.5}
        fill="none"
      />

      {/* angle arc + radius */}
      <polyline
        points={arcPath(angleDeg)}
        fill="none"
        stroke="#9ca3af"
        strokeWidth={1.5}
      />
      <line
        x1={origin.x}
        y1={origin.y}
        x2={point.x}
        y2={point.y}
        stroke="#e5e7eb"
        strokeOpacity={0.6}
        strokeWidth={1.5}
      />

      {/* csc: origin -> (0, csc) along the y-axis */}
      {cscPoint && (
        <g opacity={opacityFor("csc")}>
          <line
            x1={origin.x}
            y1={origin.y}
            x2={cscPoint.x}
            y2={cscPoint.y}
            stroke={FUNCTION_COLORS.csc}
            strokeWidth={4}
            strokeLinecap="round"
          />
          {labelVisible("csc") && (
            <text
              x={cscPoint.x - 10}
              y={(origin.y + cscPoint.y) / 2}
              fill={FUNCTION_COLORS.csc}
              fontSize={22}
              textAnchor="end"
            >
              csc
            </text>
          )}
        </g>
      )}

      {/* cot: point -> (0, csc), the "other half" of the tangent line */}
      {cscPoint && (
        <g opacity={opacityFor("cot")}>
          <line
            x1={point.x}
            y1={point.y}
            x2={cscPoint.x}
            y2={cscPoint.y}
            stroke={FUNCTION_COLORS.cot}
            strokeWidth={4}
            strokeLinecap="round"
          />
          {labelVisible("cot") && (
            <text
              x={(point.x + cscPoint.x) / 2 - 6}
              y={(point.y + cscPoint.y) / 2 - 10}
              fill={FUNCTION_COLORS.cot}
              fontSize={22}
              textAnchor="middle"
            >
              cot
            </text>
          )}
        </g>
      )}

      {/* cos: (0, sin) -> point, horizontal */}
      <g opacity={opacityFor("cos")}>
        <line
          x1={cosFoot.x}
          y1={cosFoot.y}
          x2={point.x}
          y2={point.y}
          stroke={FUNCTION_COLORS.cos}
          strokeWidth={4}
          strokeLinecap="round"
        />
        {labelVisible("cos") && (
          <text
            x={(cosFoot.x + point.x) / 2}
            y={cosFoot.y - 8}
            fill={FUNCTION_COLORS.cos}
            fontSize={22}
            textAnchor="middle"
          >
            cos
          </text>
        )}
      </g>

      {/* sin: (cos, 0) -> point, vertical */}
      <g opacity={opacityFor("sin")}>
        <line
          x1={sinFoot.x}
          y1={sinFoot.y}
          x2={point.x}
          y2={point.y}
          stroke={FUNCTION_COLORS.sin}
          strokeWidth={4}
          strokeLinecap="round"
        />
        {labelVisible("sin") && (
          <text
            x={sinFoot.x + 10}
            y={(sinFoot.y + point.y) / 2}
            fill={FUNCTION_COLORS.sin}
            fontSize={22}
          >
            sin
          </text>
        )}
      </g>

      {/* tan: point -> (sec, 0), the tangent line's other half */}
      {secPoint && (
        <g opacity={opacityFor("tan")}>
          <line
            x1={point.x}
            y1={point.y}
            x2={secPoint.x}
            y2={secPoint.y}
            stroke={FUNCTION_COLORS.tan}
            strokeWidth={4}
            strokeLinecap="round"
          />
          {labelVisible("tan") && (
            <text
              x={(point.x + secPoint.x) / 2 + 10}
              y={(point.y + secPoint.y) / 2 - 6}
              fill={FUNCTION_COLORS.tan}
              fontSize={22}
            >
              tan
            </text>
          )}
        </g>
      )}

      {/* sec: origin -> (sec, 0) along the x-axis */}
      {secPoint && (
        <g opacity={opacityFor("sec")}>
          <line
            x1={origin.x}
            y1={origin.y}
            x2={secPoint.x}
            y2={secPoint.y}
            stroke={FUNCTION_COLORS.sec}
            strokeWidth={4}
            strokeLinecap="round"
          />
          {labelVisible("sec") && (
            <text
              x={(origin.x + secPoint.x) / 2}
              y={secPoint.y + 26}
              fill={FUNCTION_COLORS.sec}
              fontSize={22}
              textAnchor="middle"
            >
              sec
            </text>
          )}
        </g>
      )}

      {/* the point on the circle itself */}
      <circle cx={point.x} cy={point.y} r={5} fill="#f3f4f6" />
    </svg>
  );
};
