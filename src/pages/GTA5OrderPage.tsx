import { useState } from 'react';
import styled from 'styled-components';
import 'rc-slider/assets/index.css';
import React, { useRef } from 'react';
import ReactSelect from 'react-select';

// --- Стили ---
const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 16px;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 24px;
  }
`;
const LeftCol = styled.div`
  flex: 1.2;
  min-width: 320px;
`;
const RightCol = styled.div`
  flex: 1;
  min-width: 320px;
`;
const OrderSummary = styled.div`
  background: #23224a;
  border-radius: 14px;
  padding: 22px 18px;
  color: #fff;
  margin-bottom: 24px;
`;
const SummaryTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 12px;
`;
const TotalPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffe066;
  margin-bottom: 18px;
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 14px;
  button {
    flex: 1;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 8px;
    border: none;
    padding: 14px 0;
    cursor: pointer;
    transition: background 0.2s;
  }
`;
const BuyNow = styled.button`
  background: linear-gradient(90deg, #ffe066 60%, #ffd700 100%);
  color: #181733;
  &:hover { background: #ffd700; }
`;
const AddToCart = styled.button`
  background: linear-gradient(90deg, #3ec6e0 60%, #5f8fff 100%);
  color: #fff;
  &:hover { background: #5f8fff; }
`;
const InfoBlock = styled.div`
  background: #23224a;
  border-radius: 14px;
  padding: 18px 16px;
  color: #b8c7f0;
  margin-bottom: 18px;
  font-size: 1rem;
`;
const Section = styled.div`
  margin-bottom: 22px;
`;
const Label = styled.label`
  display: block;
  font-size: 1.05rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: #ffe066;
`;
const DeliveryRow = styled.div`
  display: flex;
  gap: 10px;
`;
const DeliveryBtn = styled.button<{selected: boolean}>`
  flex: 1;
  padding: 12px 0;
  border-radius: 7px;
  border: none;
  background: ${({selected}) => selected ? '#ffe066' : '#23224a'};
  color: ${({selected}) => selected ? '#181733' : '#fff'};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
`;
const OptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
`;
const OptionLabel = styled.label`
  flex: 1;
  font-size: 1rem;
`;

const deliveryOptions = ['Normal', 'Express', 'Super Express'];

// --- Дополнительные услуги и опции ---
const BUNKER_RESEARCH = { id: 'bunker', label: 'All Bunker Research Completed', price: 26.77 };
const MAX_STATS = { id: 'max_stats', label: 'Maximum Character Skills', price: 35.70 };

// Кастомные значения для кеша: сначала только 0 и 10, затем шаг 1 до 30, далее как раньше
const cashSteps = [
  0, 10,
  ...Array.from({length: 20}, (_, i) => 11 + i), // 11-30 шаг 1
  ...Array.from({length: 15}, (_, i) => 35 + i * 5), // 35-100 шаг 5
  ...Array.from({length: 11}, (_, i) => 110 + i * 10), // 110-200 шаг 10
  ...Array.from({length: 17}, (_, i) => 250 + i * 50), // 250-1000 шаг 50
].filter(v => v <= 1000);

// steps и marks для уровня
const levelSteps = [
  0, 50,
  ...Array.from({length: 15}, (_, i) => 55 + i * 5), // 55-120 шаг 5
  ...Array.from({length: 9}, (_, i) => 130 + i * 10) // 130-200 шаг 10
].filter(v => v <= 200);
const levelMarks = [0, 50, 100, 150, 200];

// Функция для неравномерного процента (0-10M — 20%, остальные — равномерно на 80%)
function getNonLinearPercent(idx: number, steps: number[]): number {
  // Строгие проверки границ
  if (idx < 0) return 0;
  if (idx >= steps.length - 1) return 100;
  
  // Для 0 и 10M используем фиксированные проценты
  if (idx === 0) return 0;
  if (idx === 1) return 20;
  
  // Для остальных значений используем равномерное распределение
  const rest = steps.length - 2; // Количество шагов после 10M
  const restPercent = 80; // Оставшиеся 80% делим равномерно
  return 20 + ((idx - 1) / rest) * restPercent;
}

// Функция для равномерного процента (для машин)
function getLinearPercent(idx: number, steps: number[]): number {
  if (idx <= 0) return 0;
  if (idx >= steps.length - 1) return 100;
  return (idx / (steps.length - 1)) * 100;
}

// Функция процента для уровня (как у cash)
function getLevelPercent(idx: number, steps: number[]): number {
  if (idx < 0) return 0;
  if (idx >= steps.length - 1) return 100;
  if (idx === 0) return 0;
  if (idx === 1) return 20;
  const rest = steps.length - 2;
  const restPercent = 80;
  return 20 + ((idx - 1) / rest) * restPercent;
}

// Кастомный слайдер для cashSteps
interface CustomCashSliderProps {
  value: number;
  onChange: (v: number) => void;
  steps: number[];
  marks: number[];
  percentMap?: (idx: number, steps: number[]) => number;
  isCarsSlider?: boolean;
  isLevelSlider?: boolean;
}
function CustomCashSlider({ value, onChange, steps, marks, percentMap, isCarsSlider, isLevelSlider }: CustomCashSliderProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const idx = steps.indexOf(value);
  const getPercent = percentMap || getNonLinearPercent;
  const percents = steps.map((_, i) => getPercent(i, steps));
  const percent = percents[idx];
  const handlePercent = idx === steps.length - 1 ? percents[percents.length - 1] : percent;

  // Перетаскивание handle
  const onDrag = (e: Event) => {
    let clientX: number;
    if ('touches' in e && (e as TouchEvent).touches.length > 0) {
      clientX = (e as TouchEvent).touches[0].clientX;
    } else if ('clientX' in e) {
      clientX = (e as MouseEvent).clientX;
    } else {
      return;
    }
    const rail = railRef.current;
    if (!rail) return;
    const rect = rail.getBoundingClientRect();
    const x = clientX - rect.left;

    // Строгие проверки границ
    if (x <= 0) {
      onChange(steps[0]); // 0M
      return;
    }
    if (x >= rect.width) {
      onChange(steps[steps.length - 1]); // 1B
      return;
    }

    // Вычисляем относительную позицию в процентах
    const rel = (x / rect.width) * 100;

    // Находим ближайший индекс
    let closestIdx = 0;
    let minDiff = Infinity;

    for (let i = 0; i < percents.length; i++) {
      const diff = Math.abs(rel - percents[i]);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    }

    // Не позволяем handle выходить за пределы последней точки
    if (closestIdx > steps.length - 1) closestIdx = steps.length - 1;
    onChange(steps[closestIdx]);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: 56, margin: '24px 0 0 0' }}>
      {/* Rail */}
      <div ref={railRef} style={{ position: 'absolute', left: 0, right: 0, top: 16, height: 8, background: '#fff', borderRadius: 4 }} />
      {/* Активная часть */}
      <div style={{ position: 'absolute', left: 0, top: 16, height: 8, width: `${percent}%`, background: '#ffe066', borderRadius: 4, zIndex: 1 }} />
      {/* Точки и подписи */}
      {marks.map((val: number) => {
        const isLast = (val === steps[steps.length - 1]);
        const markIdx = isLast
          ? steps.length - 1
          : steps.findIndex(v => v >= val);
        const markPercent = getPercent(markIdx, steps);
        // Для всех слайдеров сдвигаем последнюю точку влево на 5px
        const markLeft = markIdx === steps.length - 1
          ? `calc(${markPercent}% - 4px - 5px)`
          : `calc(${markPercent}% - 4px)`;
        return (
          <React.Fragment key={val}>
            {/* Точка */}
            <div style={{
              position: 'absolute',
              left: markLeft,
              top: 12,
              width: 8,
              height: 8,
              borderRadius: '50%',
              border: '2px solid #ffe066',
              background: '#23224a',
              zIndex: 2,
              boxSizing: 'border-box',
            }} />
            {/* Подпись */}
            <div style={{
              position: 'absolute',
              left: markIdx === steps.length - 1 ? `calc(${markPercent}% - 20px - 5px)` : `calc(${markPercent}% - 20px)`,
              top: 36,
              width: 40,
              textAlign: 'center',
              color: '#b8c7f0',
              fontSize: '0.95rem',
              fontWeight: 500,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}>
              {(isCarsSlider || isLevelSlider) ? val : (val === 1000 ? '1B' : val + 'M')}
            </div>
          </React.Fragment>
        );
      })}
      {/* Handle */}
      <div
        style={{
          position: 'absolute',
          left: idx === steps.length - 1 ? `calc(${handlePercent}% - 12px - 5px)` : `calc(${handlePercent}% - 12px)`,
          top: 8,
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: '#ffe066',
          border: '3px solid #ffe066',
          boxShadow: '0 2px 8px #ffe06655',
          cursor: 'pointer',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'left 0.1s',
        }}
        onMouseDown={e => {
          e.preventDefault();
          const move = (ev: Event) => { onDrag(ev); };
          const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
          window.addEventListener('mousemove', move);
          window.addEventListener('mouseup', up);
        }}
        onTouchStart={() => {
          const move = (ev: Event) => { onDrag(ev); };
          const up = () => { window.removeEventListener('touchmove', move); window.removeEventListener('touchend', up); };
          window.addEventListener('touchmove', move);
          window.addEventListener('touchend', up);
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#23224a', border: '2px solid #ffe066' }} />
      </div>
    </div>
  );
}

export default function GTA5OrderPage() {
  const [platform, setPlatform] = useState('');
  const [gameVersion, setGameVersion] = useState('');
  const [delivery, setDelivery] = useState('Normal');
  const [cashAmount, setCashAmount] = useState(50); // млн
  const [carsAmount, setCarsAmount] = useState(10); // для модифицированных машин
  const [outfitsAmount, setOutfitsAmount] = useState(0); // для аутфитов
  const [cashAmount3, setCashAmount3] = useState(50); // состояние для третьего cash-слайдера
  const [bunker, setBunker] = useState(false);
  const [maxStats, setMaxStats] = useState(false);
  const [cashType, setCashType] = useState<'pure' | 'cashcars'>('pure');

  // Опции платформ без иконок
  const platformOptions = [
    { value: 'PC', label: 'PC' },
    { value: 'PlayStation', label: 'PlayStation' },
    { value: 'Xbox', label: 'Xbox' },
  ];
  // Опции версий игры
  const psVersions = [
    { value: 'PS4', label: 'PS4' },
    { value: 'PS5', label: 'PS5' },
  ];
  const xboxVersions = [
    { value: 'XBOX ONE', label: 'XBOX ONE' },
    { value: 'XBOX XS', label: 'XBOX XS' },
  ];

  // Итоговая стоимость
  let total = 0;
  if (cashAmount >= 200) total += 69.99;
  else if (cashAmount >= 100) total += 39.99;
  else if (cashAmount >= 50) total += 22.31;
  // Цена за машины (пример: 10 = 44.62, 20 = 79.99)
  if (carsAmount >= 20) total += 79.99;
  else if (carsAmount >= 10) total += 44.62;
  // Цена за третий слайдер кеша
  if (cashAmount3 >= 200) total += 69.99;
  else if (cashAmount3 >= 100) total += 39.99;
  else if (cashAmount3 >= 50) total += 22.31;
  if (bunker) total += BUNKER_RESEARCH.price;
  if (maxStats) total += MAX_STATS.price;

  // steps и marks для машин и аутфитов
  const carsSteps = Array.from({length: 21}, (_, i) => i); // 0-20
  const carsMarks = [0, 5, 10, 15, 20];
  const outfitsSteps = carsSteps;
  const outfitsMarks = carsMarks;

  return (
    <PageWrapper>
      <LeftCol>
        <InfoBlock>
          <b>How it works:</b> Select any services and options you want, adjust them in the order block, and proceed to checkout. You can combine cash, cars, level boosts, and more in one order!
        </InfoBlock>
        <InfoBlock>
          <b>Why choose us?</b> Fast delivery, 100% safety, best prices, 24/7 support, and real player reviews.
        </InfoBlock>
      </LeftCol>
      <RightCol>
        <OrderSummary>
          <SummaryTitle>Order GTA 5 Services</SummaryTitle>
          <Section>
            <Label>PLATFORM</Label>
            <div style={{ marginBottom: 8 }}>
              <ReactSelect
                options={platformOptions}
                value={platformOptions.find(opt => opt.value === platform) || null}
                onChange={(opt: { value: string } | null) => {
                  setPlatform(opt ? opt.value : '');
                  setGameVersion(''); // сбрасываем версию при смене платформы
                }}
                placeholder="SELECT PLATFORM"
                styles={{
                  control: (base: any) => ({ ...base, background: '#23224a', borderColor: '#2e2d5a', color: '#fff', minHeight: 48, borderRadius: 10, boxShadow: 'none' }),
                  menu: (base: any) => ({ ...base, background: '#23224a', borderRadius: 10, color: '#fff' }),
                  option: (base: any, state: any) => ({ ...base, background: state.isSelected ? '#2e2d5a' : state.isFocused ? '#23224a' : '#23224a', color: '#fff', cursor: 'pointer' }),
                  singleValue: (base: any) => ({ ...base, color: '#fff' }),
                  placeholder: (base: any) => ({ ...base, color: '#b8c7f0' }),
                  dropdownIndicator: (base: any) => ({ ...base, color: '#fff' }),
                  indicatorSeparator: () => ({ display: 'none' }),
                }}
                isSearchable={false}
              />
            </div>
            {/* Game Version select — только если выбрана PlayStation или Xbox */}
            {(platform === 'PlayStation' || platform === 'Xbox') && (
              <div style={{ marginBottom: 8 }}>
                <ReactSelect
                  options={platform === 'PlayStation' ? psVersions : xboxVersions}
                  value={platform === 'PlayStation'
                    ? psVersions.find(opt => opt.value === gameVersion) || null
                    : xboxVersions.find(opt => opt.value === gameVersion) || null}
                  onChange={(opt: any) => setGameVersion(opt ? opt.value : '')}
                  placeholder="SELECT GAME VERSION"
                  styles={{
                    control: (base: any) => ({ ...base, background: '#23224a', borderColor: '#2e2d5a', color: '#fff', minHeight: 48, borderRadius: 10, boxShadow: 'none' }),
                    menu: (base: any) => ({ ...base, background: '#23224a', borderRadius: 10, color: '#fff' }),
                    option: (base: any, state: any) => ({ ...base, background: state.isSelected ? '#2e2d5a' : state.isFocused ? '#23224a' : '#23224a', color: '#fff', cursor: 'pointer' }),
                    singleValue: (base: any) => ({ ...base, color: '#fff' }),
                    placeholder: (base: any) => ({ ...base, color: '#b8c7f0' }),
                    dropdownIndicator: (base: any) => ({ ...base, color: '#fff' }),
                    indicatorSeparator: () => ({ display: 'none' }),
                  }}
                  isSearchable={false}
                />
              </div>
            )}
          </Section>
          <Section>
            <Label>AMOUNT OF CASH</Label>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 8 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  type="radio"
                  name="cashType"
                  value="pure"
                  checked={cashType === 'pure'}
                  onChange={() => setCashType('pure')}
                />
                Pure Cash
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  type="radio"
                  name="cashType"
                  value="cashcars"
                  checked={cashType === 'cashcars'}
                  onChange={() => setCashType('cashcars')}
                />
                Cash/Cars
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CustomCashSlider
                value={cashAmount}
                onChange={v => setCashAmount(v)}
                steps={cashSteps}
                marks={[0, 10, 30, 100, 200, 1000]}
              />
              <span style={{ minWidth: '60px', textAlign: 'right', marginLeft: '12px', color: '#fff', fontSize: '1.1rem' }}>
                {cashAmount >= 1000 ? '1B' : cashAmount + 'M'}
              </span>
            </div>
          </Section>
          <Section>
            <Label>NUMBER OF MODDED CARS</Label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CustomCashSlider
                value={carsAmount}
                onChange={v => setCarsAmount(v)}
                steps={carsSteps}
                marks={carsMarks}
                percentMap={getLinearPercent}
                isCarsSlider
              />
              <span style={{ minWidth: '60px', textAlign: 'right', marginLeft: '12px', color: '#fff', fontSize: '1.1rem' }}>
                {carsAmount}
              </span>
            </div>
          </Section>
          <Section>
            <Label>OUTFITS</Label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CustomCashSlider
                value={outfitsAmount}
                onChange={v => setOutfitsAmount(v)}
                steps={outfitsSteps}
                marks={outfitsMarks}
                percentMap={getLinearPercent}
                isCarsSlider
              />
              <span style={{ minWidth: '60px', textAlign: 'right', marginLeft: '12px', color: '#fff', fontSize: '1.1rem' }}>
                {outfitsAmount}
              </span>
            </div>
          </Section>
          <Section>
            <Label>LEVEL</Label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CustomCashSlider
                value={cashAmount3}
                onChange={v => setCashAmount3(v)}
                steps={levelSteps}
                marks={levelMarks}
                percentMap={getLevelPercent}
                isLevelSlider
              />
              <span style={{ minWidth: '60px', textAlign: 'right', marginLeft: '12px', color: '#fff', fontSize: '1.1rem' }}>
                {cashAmount3}
              </span>
            </div>
          </Section>
          <Section>
            <Label>OPTIONS</Label>
            <OptionRow>
              <input type="checkbox" checked={bunker} onChange={e => setBunker(e.target.checked)} id="bunker" />
              <OptionLabel htmlFor="bunker">{BUNKER_RESEARCH.label} <span style={{color:'#ffe066'}}>{BUNKER_RESEARCH.price}€</span></OptionLabel>
            </OptionRow>
            <OptionRow>
              <input type="checkbox" checked={maxStats} onChange={e => setMaxStats(e.target.checked)} id="maxstats" />
              <OptionLabel htmlFor="maxstats">{MAX_STATS.label} <span style={{color:'#ffe066'}}>{MAX_STATS.price}€</span></OptionLabel>
            </OptionRow>
          </Section>
          <Section>
            <Label>DELIVERY SPEED</Label>
            <DeliveryRow>
              {deliveryOptions.map(opt => (
                <DeliveryBtn
                  key={opt}
                  selected={delivery === opt}
                  onClick={() => setDelivery(opt)}
                >
                  {opt}
                </DeliveryBtn>
              ))}
            </DeliveryRow>
          </Section>
          <TotalPrice>Total: {total.toFixed(2)}€</TotalPrice>
          <ButtonRow>
            <BuyNow>BUY NOW</BuyNow>
            <AddToCart>ADD TO CART</AddToCart>
          </ButtonRow>
        </OrderSummary>
        <InfoBlock>
          <b>Need help?</b> Contact our support in chat or Discord for a custom order or any questions!
        </InfoBlock>
      </RightCol>
    </PageWrapper>
  );
} 