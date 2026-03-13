// test/phase1.test.ts
// Phase 1 链路验证测试

import { LyraEngine } from '../src/index';

async function testPhase1() {
  console.log('=== Lyra V6.0 Phase 1 测试 ===\n');

  const engine = new LyraEngine({});

  const userText = "帮我写一个适合小红书的护肤新品文案，语气高级一点，短一点";

  try {
    const result = await engine.run(userText);

    console.log('✅ TaskSpec 生成成功:');
    console.log(JSON.stringify(result.taskSpec, null, 2));
    console.log('\n✅ Context 装配成功:');
    console.log(result.context);
    console.log('\n🎉 Phase 1 链路验证通过！');
  } catch (error) {
    console.error('❌ 测试失败:', error);
    process.exit(1);
  }
}

testPhase1();
