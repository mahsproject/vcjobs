<script lang="ts">
  let {
    variant = 'icon',
    class: className = '',
  }: {
    variant?: 'icon' | 'row' | 'inline';
    class?: string;
  } = $props();
  void variant;
  void className;
</script>
